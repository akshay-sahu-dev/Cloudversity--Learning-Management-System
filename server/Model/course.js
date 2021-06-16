const mongoose = require('mongoose');
const Review = require("./review");

const courseSchema = new mongoose.Schema ({
    courseName: {
        type: String,
        required: true
    },
    authorName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tutor",
        default: null
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
        default: 0
    },
    totalSubscriptions: {
        type: Number,
        default: 0
    },
    courseDuration: {
        type: Number,
    },
    level: {
        type: String,
        required: true
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "review",
        default: null
        
    },
    videos: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "video",
        default: null
    },
    enrolledStudents: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "student",
        default: null
    },
    wishlistedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "student",
        default: null
    }

});

courseSchema.pre('validate', async function (next) {
    this.totalSubscriptions = this.enrolledStudents.length;
    next(); 
});

module.exports = mongoose.model("course", courseSchema);