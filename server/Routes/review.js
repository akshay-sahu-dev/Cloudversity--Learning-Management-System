const express = require("express");
const Router = express.Router();
const auth = require("../Auth/auth");

const { addReview, getAllReviews, editReview, deleteReview } = require("../Controllers/reviewControllers");

// ------------------- POST: Route to add a review to the course ------------------- //
Router.post("/addreview/:courseId", auth, addReview);

// ------------------- GET: Route to get all the reviews of the course ------------------- //
Router.get("/allreviews/:courseId", getAllReviews);

// ------------------- PATCH: Route to edit the review of a course ------------------- //
Router.patch("/editreview/:reviewId", auth, editReview);

// ------------------- DELETE: Route to Delete the review of a course ------------------- //
Router.delete("/deletereview/:reviewId", auth, deleteReview);

module.exports = Router;



