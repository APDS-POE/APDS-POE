// models/User.mjs
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    idNumber: {
        type: String,
        required: true,
        unique: true,
        // Validates the id making sure its a 13-digit ID number
        match: /^[0-9]{13}$/, 
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        //Validates the account has 10 digits
        match: /^[0-9]{10}$/, 
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['customer', 'employee'],
        default: 'customer',
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
