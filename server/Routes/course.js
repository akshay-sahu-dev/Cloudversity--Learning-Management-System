const express = require("express");
const Router = express.Router();
const auth = require("../Auth/auth");

const { addCourse, getAllCourses, getSingleCourse, deleteCourse, enrollCourse, updateCourse, uploadVideo, deleteVideo, applyDiscount, updateThumbnail } = require("../Controllers/courseControllers");

//-------------- COURSE AND VIDEO ROUTES BELOW ---------------- //

// ------------------- POST: Add a New Course ------------------//
Router.post("/addcourse", auth, addCourse );

// ------------------- GET: get All Courses ------------------//
Router.get("/allcourses", getAllCourses);

// ------------------- GET: get Course by courseId -----------------//
Router.get("/course/:courseId", getSingleCourse);

// ------------------- DELETE: Delete a particular Course ---------------//
Router.delete("/deletecourse/:courseId", auth, deleteCourse);

// ------------------- POST: Enroll to Course ---------------//
Router.post("/enroll/:courseId", auth, enrollCourse);

// ------------------- PATCH: Course details Update ---------------//
Router.patch("/updatecourse/:courseId", auth, updateCourse);


// ------------------- PATCH: Course Thumbnail Update ---------------//
Router.patch("/updatethumbnail/:courseId", auth, updateThumbnail);

// ------------------- POST: Upload Videos ---------------//
Router.post("/uploadvideo/:courseId", auth, uploadVideo);

// ------------------- DELETE: Route to Delete a Video ------------------- //
Router.delete("/deletevideo/:videoId", auth, deleteVideo);

// ------------------- PATCH: Apply discount on a Course ---------------//
Router.patch("/applydiscount/:courseId", auth, applyDiscount);

module.exports = Router;
