const mongoose = require('mongoose');
require ('dotenv').config();
const URI = process.env.MONGO_URI;

// ---------- Function to initialise DB connection using Mongoose ---------- //
const MongoInit = async() => {
    try {
        //  Connection to MongoDB Atlas
        await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser:true, useFindAndModify: false, useCreateIndex: true });
        
        //  Connection to MongoDB local
        // await mongoose.connect("mongodb://localhost:27017/cloudversity", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true });

        console.log("Connected to MongoDB Atlas...");
        // console.log("Connected to MongoDB...");


    } catch (error) {
        console.log("DB Connection Error: ",error.message);

    }
}

module.exports = MongoInit;