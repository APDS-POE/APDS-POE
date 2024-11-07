import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.mjs';

dotenv.config();

// Utility function to hash passwords
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12); // Use a stronger salt round
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
        password: 'CustomerPass456!',
    },
    {
        fullName: 'John Smith',
        idNumber: '7894561230321',
        accountNumber: '7894561230',
        password: 'CustomerPass789!',
    },
    {
        fullName: 'Alice Johnson',
        idNumber: '2345678901234',
        accountNumber: '2345678901',
        password: 'CustomerPass123!',
    },
    // Add more customers here as needed
];

const addUsers = async (users, userType) => {
    for (const userData of users) {
        const existingUser = await User.findOne({ accountNumber: userData.accountNumber });
        if (existingUser) {
            console.log(`${userType} with account number ${userData.accountNumber} already exists.`);
            continue;
        }

        const hashedPassword = await hashPassword(userData.password);

        const user = new User({
            ...userData,
            password: hashedPassword,
        });

        await user.save();
        console.log(`${userType} ${userData.fullName} added successfully.`);
    }
};

const addAllUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

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

addAllUsers();
