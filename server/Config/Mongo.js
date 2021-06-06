const mongoose = require('mongoose');
require ('dotenv').config();
const URI = process.env.MONGO_URI;

// ---------- Function to initialise DB connection using Mongoose ---------- //
const MongoInit = async() => {
    try {
        await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser:true, useFindAndModify: true, useCreateIndex: true });

        console.log("Connected to MongoDB Atlas...");

    } catch (error) {
        console.log("DB Connection Error: ",error.message);

    }
}

module.exports = MongoInit;