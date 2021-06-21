const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewerId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Student",
        default: null
    },
    reviewerName: {
        type: String,
        required: true
    },
    courseId: {
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
        required: true,
        default: 0
    },
    likes :{
        type: Number,
        default: 0
    }
}, {timeStamps: true});

module.exports = mongoose.model('review', reviewSchema);
