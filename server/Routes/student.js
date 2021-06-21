const express = require('express');
const Router = express.Router();
const auth = require("../Auth/auth");

const { signUp, login, getAllStudents, getSingleStudent, addToWishlist, removeFromWishlist, addToCart, removeFromCart, getLatestCourse } = require('../Controllers/studenControllers');

// ----------------- POST: Student Signup Route ------------------ //
Router.post('/signup', signUp);

// ------------------ POST: Student Login Route ------------------- //

Router.post('/login', login);

// ----------------- GET: Route to get list of all the students ------------------- //
Router.get("/allstudents", getAllStudents);

Router.get("/:studentId", getSingleStudent );

// ----------------- POST: Route to Add a course to Wishlist ------------------- //
Router.post("/addtowishlist/:courseId", auth, addToWishlist);

// ----------------- DELETE: Route to remove a course from Wishlist ------------------- //
Router.delete("/removefromwishlist/:courseId", auth, removeFromWishlist);

// ----------------- POST: Route to add a course to the Cart ------------------- //
Router.post("/addtocart/:courseId", auth, addToCart);

// ----------------- PATCH: Route to remove a course from Cart ------------------- //
Router.patch("/removefromcart/:courseId", auth, removeFromCart);

// ----------------- POST: Route to update the last visited course ------------------- //
Router.post("/latestcourse/:courseId", auth, getLatestCourse);

module.exports = Router;