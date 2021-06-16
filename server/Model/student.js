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
    profileInfo: {
        contactNo: {
            type: Number,
        },
        aboutMe: {
            type: String,
            default: "Tell us about yourself"
        },
        occupation: {
            type: String,
        },
        bankAccount: {
            type: Number,
            default: null
        },
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
    },
    wishlist : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "course",
        default: null
    },
    lastViewedCourse: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "course",
        
    },
    cart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "course",
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model('student', StudentSchema);