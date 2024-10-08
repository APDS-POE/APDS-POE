// routes/userRoutes.mjs
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { fullName, idNumber, accountNumber, password } = req.body;

        // Input Validation using RegEx
        const idNumberRegex = /^[0-9]{13}$/;
        const accountNumberRegex = /^[0-9]{10}$/;
         // At least 8 characters, one digit, one lowercase, one uppercase
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!idNumberRegex.test(idNumber)) {
            return res.status(400).json({ message: 'Invalid ID number format.' });
        }

        if (!accountNumberRegex.test(accountNumber)) {
            return res.status(400).json({ message: 'Invalid account number format.' });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and include uppercase, lowercase letters, and numbers.' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ idNumber }, { accountNumber }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with given ID or account number already exists.' });
        }

        // Hash Password and salt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const newUser = new User({
            fullName,
            idNumber,
            accountNumber,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { idNumber, accountNumber, password } = req.body;

        // Input Validation
        if (!idNumber || !accountNumber || !password) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        // Find User
        const user = await User.findOne({ idNumber, accountNumber });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Compare Passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Create JWT
        const token = jwt.sign(
            { userId: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

export default router;
