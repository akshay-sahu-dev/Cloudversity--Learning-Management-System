const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Tutor = require('../Model/tutor');


Router.post('/signup', async (req, res) => {
    try {
        const tutorData = req.body;

        const tutor = new Tutor({
            ...tutorData
        });
        // --- hashing the password --- /
        const hashedPassword = await bcrypt.hash(tutorData.password, 10);
        tutor.password = hashedPassword;

        await tutor.save();

        res.send({ message: "Tutor registered successfully", data: tutor });

    } catch (error) {

        console.log("Error: ", error);
        res.send({ message: "Error while signing up", error: error.message });
    }
});

module.exports = Router;