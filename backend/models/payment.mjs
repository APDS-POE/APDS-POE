// models/Payment.mjs
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'ZAR', 'GBP', 'JPY'], 
    },
    provider: {
        type: String,
        required: true,
        enum: ['SWIFT'],
    },
    payeeAccount: {
        type: String,
        required: true,
        //Validates the account has 10 digits
        match: /^[0-9]{10,}$/, 
    },
    swiftCode: {
        type: String,
        required: true,
        //validates the swift code
        match: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 
    },
    status: {
        type: String,
        enum: ['pending', 'verified'],
        default: 'pending',
    },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
