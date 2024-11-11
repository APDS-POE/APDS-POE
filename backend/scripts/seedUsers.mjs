import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.mjs';

// Loading environment variables from .env file
dotenv.config();

// Utility function to hash passwords
const hashPassword = async (password) => {
    // Use a stronger salt round
    const salt = await bcrypt.genSalt(12); 
     // Hash the password and return it
    return bcrypt.hash(password, salt);
};

// Employees and customers to be added
const employees = [
    {
        fullName: 'John Doe',
        idNumber: '1234567890123',
        accountNumber: '1234567890',
        password: 'SecurePass123!',
        userType: 'employee',
    },
];

const customers = [
    {
        fullName: 'Jane Doe',
        idNumber: '9876543210987',
        accountNumber: '0987654321',
        password: 'CustomerPass456_',
    },
    {
        fullName: 'John Smith',
        idNumber: '7894561230321',
        accountNumber: '7894561230',
        password: 'CustomerPass789@',
    },
    {
        fullName: 'Alice Johnson',
        idNumber: '2345678901234',
        accountNumber: '2345678901',
        password: 'CustomerPass123#',
    },
   
];
// Function to add a list of users
const addUsers = async (users, userType) => {
    for (const userData of users) {
        // Check if a user with the same account number already exists
        const existingUser = await User.findOne({ accountNumber: userData.accountNumber });
        if (existingUser) {
              // If user already exists, log the message and skip this user
            console.log(`${userType} with account number ${userData.accountNumber} already exists.`);
            continue;
        }
        // Hash the user's password before storing it
        const hashedPassword = await hashPassword(userData.password);

        // Create a new user object with the hashed password
        const user = new User({
            ...userData,
            // Store the hashed password instead of the plain text
            password: hashedPassword,
        });
         // Save the user to the database
        await user.save();
        console.log(`${userType} ${userData.fullName} added successfully.`);
    }
};

const addAllUsers = async () => {
    try {
         // Connect to the MongoDB database using the URI from the environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
         // Run both addUsers functions for employees and customers concurrently
        await Promise.all([
            addUsers(employees, 'Employee'),
            addUsers(customers, 'Customer')
        ]);

        console.log('All users added successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error adding users:', error);
        process.exit(1);
    }
};
// Call the function to add all users to the database
addAllUsers();
