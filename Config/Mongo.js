const mongoose = require('mongoose');
require ('dotenv').config();
const URI = process.env.MONGO_URI;

const MongoInit = async() => {
    try {
        await mongoose.connect(URI, { useUnifiedTopology: true , useNewUrlParser:true})
        console.log("Connected to MongoDB Atlas...")
    } catch (error) {
        console.log("DB Connection Error: ",error.message);

    }
}

module.exports = MongoInit;