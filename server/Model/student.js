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
    profileImg: {
        type: String,
        default: null
    },
    enrolledCourses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "course",
        default: null
    },
    yourReviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "review",
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model('student', StudentSchema);