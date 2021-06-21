const express = require("express");
const Router = express.Router();
const auth = require("../Auth/auth");

const { updateProfile, updateProfileImage } = require("../Controllers/profileControllers");


// ------------------- PATCH: Route to update the profile ------------------- //
Router.patch("/updateprofile/:id", auth, updateProfile);

// ------------------- PATCH: Route to update the dp ------------------- //
Router.patch("/updatedp/:id", auth, updateProfileImage);

module.exports = Router;