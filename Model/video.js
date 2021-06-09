const mongoose = require('mongoose');

const videoSchema  = new mongoose.Schema ({ 
    title:{
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    authorName: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }
}, {timeStamps: true});

module.exports = mongoose.model('video', videoSchema);