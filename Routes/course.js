const express = require("express");
const Router = express.Router();
const auth = require("../Auth/auth");
require("dotenv").config();
const path = require("path")
// const bcrypt = require("bcryptjs");
const Course = require("../Model/course");
const Video = require("../Model/video");
const multer = require("multer");
const bufferConversion = require("../Utils/bufferConversion");
const { imageUpload, videoUpload } = require("../Utils/multer");
const { cloudinary } = require("../Utils/clodinary");

// ------ Thumbnail upload -----temporaily replaced by multe in Utils folder-- //
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        const suffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + "-" + suffix+ path.extname(file.originalname));
    }
})

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(new Error("Only image files are allowed!"), false);
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

Router.post("/add-course", auth, imageUpload.single("thumbnail"), async (req, res)=> {   // need to add AUTH

    try {

        // const data = req.body;

        console.log("User details provided during AUTH: ", req.user);

        const course_data = new Course({
            ...req.body
        });

        const convertedBuffer = await bufferConversion(req.file.originalname, req.file.buffer);

        const uploadedImage = await cloudinary.uploader.upload(convertedBuffer, { resource_type: "image", upload_preset: "cloudversity-dev",});
        // const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        //     upload_preset: "cloudversity-dev",
        // });

        console.log("Cloudversity response: ", uploadedImage);

        course_data.thumbnail = uploadedImage.secure_url;
        course_data.authorName = req.user.id;

        await course_data.save();

        res.status(200).send({message: "Congratulations...New course added!"});
        
    } catch (error) {
        console.log("Error while creating course: ", error);

        res.status(400).send({message: "Couldn't create the course", error: error.message});
    }

});

Router.get("/all-courses", async(req, res) => {
    try {
        const courseData = await Course.find();
        res.send({message: "Fetched successfully", data: courseData});

    } catch (error) {

        console.log("Error: ", error);
        res.status(400).send({message: "Error while fetching", error:error.message});
    }
});

Router.post("/upload-video/:courseId", auth, videoUpload.single("videoLink"), async (req, res) => {

    try{
        console.log("Course Id: ", req.params.courseId, "User: ", req.user)
        const video = new Video({
            ...req.body
        });

        const convertedBuffer = await bufferConversion(req.file.originalname, req.file.buffer);

        const uploadedVideo = await cloudinary.uploader.upload(convertedBuffer, { resource_type: "video", upload_preset: "cloudversity-dev", });

        console.log("Uploaded video object: ", uploadedVideo)
        video.courseId = req.params.courseId;
        video.authorId = req.user.id;

        if (uploadedVideo.duration > 60){
            videoLength = (uploadedVideo.duration / 60).toFixed(2);
        } else {
            videoLength = uploadedVideo.duration
        };
        console.log("Video Length : ", videoLength);

        video.videoLength = videoLength;
        video.videoLink = uploadedVideo.secure_url;

        await video.save();

        const course = await Course.findById({_id: req.params.courseId});
        course.videos.push(video._id);

        await course.save();

        res.status(201).send({message: "Video uploaded successfully", videoDetails: video})

    } catch(error) {

        console.log("Error occurred while uploading...", error);
        res.status(500).send({message: "Couldn't upload the video", error: error.message});

    }
});



module.exports = Router;
