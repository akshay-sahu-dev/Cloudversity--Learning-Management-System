const mongoose = require('mongoose');

const TutorSchema = mongoose.Schema({
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
        type: String,
        required: true,
        default: 'tutor'
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: null
    },
    createdCourses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "course",
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model('tutor', TutorSchema);