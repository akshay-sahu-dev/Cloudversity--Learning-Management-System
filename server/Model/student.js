const  mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type:String,
        required: true,
        default: 'student'
    },
    password: {
        type: String,
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('student', StudentSchema);