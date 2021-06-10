const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 9000;
const cors = require('cors');
const MongoInit = require('./Config/Mongo');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const studentRoutes = require('./Routes/student');
const tutorRoutes = require('./Routes/tutor');
const courseRoutes = require('./Routes/course');
const reviewRoutes = require('./Routes/review');

const app = express();

//-------- Connecting to DB --------- //
MongoInit();

//-------- Cookie and Session setup --------- //
app.use(cookieParser());
app.use(session({

    // It holds the secret key for session
    secret: 'My_Secret_Key',  // need to replace it with process.env

    // Forces the session to be saved
    // back to the session store
    resave: true,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true
}));

//-------- Setting Up static folder --------- //
app.use(express.static('public'))
//-------- Setting up Body Parser --------- //
app.use(express.json({limit:'150mb'}));
app.use(express.urlencoded({limit:'150mb', extended:true}));
//-------- Using CORS middleware --------- //
app.use(cors());

//-------- Importing and Using the Routes --------- //
app.use("/stu", studentRoutes);
app.use("/tut", tutorRoutes);
app.use("/", courseRoutes);
app.use("/", reviewRoutes);



//-------- Route to test Sever Health --------- //
app.get('/health-check', (req, res)=> {
    res.send("Server is healthy, Health Check Passed!")
});


//-------- Listening to the PORT --------- //
app.listen(PORT, ()=> {
    console.log(`Listening to http://localhost:${PORT}`)
});