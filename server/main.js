const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 9000;
const cors = require("cors");
const MongoInit = require("./Config/Mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const studentRoutes = require("./Routes/student");
const tutorRoutes = require("./Routes/tutor");
const courseRoutes = require("./Routes/course");
const reviewRoutes = require("./Routes/review");
const profileRoutes = require("./Routes/profile");
const app = express();

//-------- Connecting to DB --------- //
MongoInit();

//-------- Cookie and Session setup --------- //
app.use(cookieParser());
app.use(session({

    // It holds the secret key for session
    secret: "My_Secret_Key",  // need to replace it with process.env

    // Forces the session to be saved
    // back to the session store
    resave: true,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true
}));

//-------- Setting Up static folder --------- //
app.use(express.static("public"))
//-------- Setting up Body Parser --------- //
app.use(express.json({limit:"150mb"}));
app.use(express.urlencoded({limit:"150mb", extended:true}));
//-------- Using CORS middleware --------- //
app.use(cors({
    origin: "*"
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


//-------- Importing and Using the Routes --------- //
app.use("/stu", studentRoutes);
app.use("/tut", tutorRoutes);
app.use("/", courseRoutes);
app.use("/", reviewRoutes);
app.use("/", profileRoutes);


//-------- Route to test Sever Health --------- //
app.get("/healthcheck", (req, res)=> {
    res.send("Server is healthy, Health Check Passed!")
});

app.get("/", (req, res) => {
    res.send("Welcome to the Cloudversity API, please refer to the API endpoint guidelines from the github repo");
});

//-------- Listening to the PORT --------- //
app.listen(PORT, ()=> {
    console.log(`Listening to http://localhost:${PORT}`)
});