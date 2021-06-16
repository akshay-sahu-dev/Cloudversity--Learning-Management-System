const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    contactNo : {
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


}); 


module.exports = mongoose.model("profile", profileSchema);
