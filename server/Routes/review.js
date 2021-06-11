require("dotenv").config();
const express = require("express");
const Router = express.Router();
const auth = require("../Auth/auth");
const path = require("path");
const Course = require("../Model/course");
const Video = require("../Model/video");
const Tutor = require("../Model/tutor");
const Student = require("../Model/student");
const Review = require("../Model/review");

Router.post('/addreview/:courseId', auth, async(req, res) => {
    try {
        
        const course = await Course.findById({_id: req.params.courseId});
        const student = await Student.findById({_id: req.user.id});
        const newReview = new Review({
            ...req.body
        });

        newReview.reviewerId = req.user.id;
        newReview.courseId = req.params.courseId;

        await newReview.save();

        course.reviews.push(newReview._id);
        student.yourReviews.push(newReview._id);

        await course.save();
        await student.save();

        res.status(200).send({message: "Review posted successfully", newReview})

    } catch (error) {
        console.log("Review not posted", error);
        res.status(500).send({message: "Error while posting review", error: error.message});
    }
});





module.exports = Router;



