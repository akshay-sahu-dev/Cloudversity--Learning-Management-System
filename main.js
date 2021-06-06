const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 9000;
const cors = require('cors');
const MongoInit = require('./Config/Mongo');
const studentRoutes = require('./Routes/student');
const tutorRoutes = require('./Routes/tutor');

const app = express();

//-------- Connecting to DB --------- //
MongoInit()
//-------- Setting Up static folder --------- //
app.use(express.static('public'))
//-------- Setting up Body Parser --------- //
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended:true}));
//-------- Using CORS middleware --------- //
app.use(cors());

//-------- Importing and Using the Routes --------- //
app.use("/stu", studentRoutes);
app.use("/tut", tutorRoutes);



//-------- Route to test Sever Health --------- //
app.get('/health-check', (req, res)=> {
    res.send("Server is healthy, Health Check Passed!")
})


//-------- Listening to the PORT --------- //
app.listen(PORT, ()=> {
    console.log(`Listening to http://localhost:${PORT}`)
})