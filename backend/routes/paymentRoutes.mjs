// routes/paymentRoutes.mjs
import express from 'express';
import jwt from 'jsonwebtoken';
import Payment from '../models/payment.mjs';
import User from '../models/User.mjs';

const router = express.Router();

// Middleware to verify JWT
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
};

// Create Payment
router.post('/', authenticate, async (req, res) => {
    try {
        if (req.user.userType !== 'customer') {
            return res.status(403).json({ message: 'Access denied.' });
        }

        const { amount, currency, provider, payeeAccount, swiftCode } = req.body;

        // Input Validation
        const currencyRegex = /^(USD|EUR|ZAR|GBP|JPY)$/;
        const swiftCodeRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount.' });
        }

        if (!currencyRegex.test(currency)) {
            return res.status(400).json({ message: 'Invalid currency.' });
        }

        if (provider !== 'SWIFT') {
            return res.status(400).json({ message: 'Invalid provider.' });
        }

        if (!swiftCodeRegex.test(swiftCode)) {
            return res.status(400).json({ message: 'Invalid SWIFT code.' });
        }

        // Create Payment
        const newPayment = new Payment({
            customer: req.user.userId,
            amount,
            currency,
            provider,
            payeeAccount,
            swiftCode,
        });

        await newPayment.save();
        res.status(201).json({ message: 'Payment created successfully.', payment: newPayment });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// Get Payments (for Employees)
router.get('/', authenticate, async (req, res) => {
    try {
        if (req.user.userType !== 'employee') {
            return res.status(403).json({ message: 'Access denied.' });
        }

        const payments = await Payment.find().populate('customer', 'fullName accountNumber');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// Verify Payment (for Employees)
router.put('/:id/verify', authenticate, async (req, res) => {
    try {
        if (req.user.userType !== 'employee') {
            return res.status(403).json({ message: 'Access denied.' });
        }

        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }

        payment.status = 'verified';
        await payment.save();

        res.json({ message: 'Payment verified successfully.', payment });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

export default router;
