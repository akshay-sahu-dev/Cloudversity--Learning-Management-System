const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const Tutor = require('../Model/tutor');


Router.post('/signup', async (req, res) => {
    try {
        const tutorData = req.body;

        let tutor = await Tutor.findOne({ email: req.body.email });
        // console.log(tutor)
        if (tutor) {
            return res.send({ message: "This email is already registered, try sign in", error: "Email already in use" });
        };

        tutor = new Tutor({
            ...tutorData
        });
        // --- hashing the password --- /
        const hashedPassword = await bcrypt.hash(tutorData.password, 10);
        tutor.password = hashedPassword;

        const token = await jwt.sign({ id: tutor._id, email: tutor.email }, process.env.JWT_SECRET, { expiresIn: "6h" });

        await tutor.save();

        res.send({ message: "Tutor registered successfully", data: tutor, token });

    } catch (error) {

        console.log("Error: ", error);
        res.send({ message: "Error while signing up", error: error.message });
    };
});

// ---------- Tutor Login Route ---------- //

Router.post('/login', async (req, res) => {
    try {

        // const loginData = req.body;

        const tutor = await Tutor.findOne({ email: req.body.email });
        console.log("Tutor obj from tutor Login: ", tutor);

        if (!tutor) {
            return res.send({ message: "This email is not registered with us, please signup first!", error: "Email not registered" });
        }

        // --- Validatig password using bcryptjs --- /
        const isValidPassword = await bcrypt.compare(req.body.password, tutor.password);

        if (!isValidPassword) {
            return res.send({ message: "Invalid Password", error: "Invalid Password" });
        }

        // --- Generating token and saving it in cookie --- /
        const token = await jwt.sign({ id: tutor._id, email: tutor.email }, process.env.JWT_SECRET, { expiresIn: "6h" });
        res.cookie('token', token, { httpOnly: true, maxAge: 1000000 });

        // console.log("Token from Teacher Login Route ==> ", token);
        // console.log("Cookie from Teacher Login Route ==> ", req.cookies);

        res.status(200).send({ message: "Tutor successfully logged in", data: tutor, token });

    } catch (error) {

        console.log("Error during Login ==> ", error);
        res.send({ message: "Error during Login", error: error.message });
    };
});

Router.get("/alltutors", async (req, res) => {
    try {
        const tutors = await Tutor.find();
        if (!tutors) {
            return res.send("No tutors found");
        }
        res.status(200).send({
            message: "Tutor list fetched successfully",
            data: tutors,
        });
        
    } catch (err) {
        console.log("Error while fetching the tutors list", error);
        res.status(500).send({ message: "Couldn't fetch the list of tutors", error: error.message });
    };
});


module.exports = Router;