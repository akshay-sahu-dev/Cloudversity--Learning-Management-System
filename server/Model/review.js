const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewerId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Student",
        default: null
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
        required: true
    },
    likes :{
        type: Number,
        default: 0
    }
}, {timeStamps: true});

module.exports = mongoose.model('review', reviewSchema);
