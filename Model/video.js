const mongoose = require('mongoose');

const videoSchema  = new mongoose.Schema ({ 
    title:{
        type: String,
        required: true
    },
    videoLength: {
        type: Number,
        required: true
    },
    videoLink: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }
}, {timeStamps: true});

module.exports = mongoose.model('video', videoSchema);