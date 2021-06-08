const express = require('express');
const Router = express.Router();
const auth = require('../Auth/auth');
require('dotenv').config();
const path = require('path')
// const bcrypt = require('bcryptjs');
const Course = require('../Model/course');
const multer = require('multer');

// ------ Thumbnail upload ------- //
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + suffix)
    }
})

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let thumbnail = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 }, fileFilter: imageFilter });

// ------- Video-uplaod -------- //

// let videoUpload = multer({
//     storage: multer.diskStorage(),
//     limits: {
//         fileSize: 1024 * 1024 * 100
//     },
//     fileFilter: function (req, file, cb) {
//         if (file.mimetype === "video/mp4") {
//             cb(null, true)
//         }
//         else {
//             //prevent the upload
//             var newError = new Error("Incorrect file type, upload in .mp4 format");
//             newError.name = "MulterError";
//             cb(newError, false);
//         }
//     }
// });
//  ---------------------------------------------------------- // 

Router.post('/add-course', auth, thumbnail.single("thumbnail"), async (req, res)=> {   // need to add AUTH

    try {

        const data = req.body;

        console.log("User details provided during AUTH: ", req.user);

        const course_data = new Course({
            ...req.body
        });

        course_data.thumbnail = req.file.filename;
        course_data.authorName = req.user.id;

        await course_data.save();

        res.status(200).send({message: "Congratulations...New course added!"})
        
    } catch (error) {
        console.log("Error while creating course: ", error);

        res.status(400).send({message: "Couldn't create the course", error: error.message});
    }

});

Router.get('/all-courses', async(req, res) => {
    try {
        const courseData = await Course.find();
        res.send({message: "Fetched successfully", data: courseData});

    } catch (error) {

        console.log("Error: ", error);
        res.status(400).send({message: "Error while fetching", error:error.message});
    }
})



module.exports = Router;
