import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.mjs';

dotenv.config();

const addEmployee = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const existingEmployee = await User.findOne({ accountNumber: '1234567890' }); // Use valid 10-digit number
        if (existingEmployee) {
            console.log('Employee already exists.');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('SecurePass123', salt);

        const employee = new User({
            fullName: 'John Doe',
            idNumber: '1234567890123',
            accountNumber: '1234567890', // Valid 10-digit number
            password: hashedPassword,
            userType: 'employee',
        });

        await employee.save();
        console.log('Employee added successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error adding employee:', error);
        process.exit(1);
    }
};

addEmployee();
