const mongoose = require('mongoose');

const courseSchema = mongoose.Schema ({
    courseName: {
        type: String,
        required: true
    },
    authorName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tutor",
        defualt: null
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        defualt: 0
    },
    total_subscriptions: {
        type: Number,
        defualt: 0
    },
    course_duration: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "students"
        
    },
    videos: {
        type: [mongoose.Schema.Types.ObjectId],
        default: null
    }

});

module.exports = mongoose.model("course", courseSchema);