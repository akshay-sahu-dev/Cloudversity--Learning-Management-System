const express = require('express');
const Router = express.Router();

const { tutorSignup, tutorLogin, getAllTutors } = require('../Controllers/tutorControllers');

// ---------- POST: Tutor Signup Route ---------- //
Router.post('/signup', tutorSignup);

// ---------- POST: Tutor Login Route ---------- //
Router.post('/login', tutorLogin);

// ---------- GET: All Tutors Route ---------- //
Router.get("/alltutors", getAllTutors);


module.exports = Router;