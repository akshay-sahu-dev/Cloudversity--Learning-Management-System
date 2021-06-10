const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Student",
        default: null
    },
    reviewedCourse: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "course",
        default: null
    },
    reviewBody: {
        type: String,
        default: null
    },
    rating: {
        type: Number,
        required: true
    }
}, {timeStamps: true});

module.exports = mongoose.model('review', reviewSchema);
