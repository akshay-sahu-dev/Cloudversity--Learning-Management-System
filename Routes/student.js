const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../Model/student');


Router.post('/signup', async (req, res) => {
    try {
        const studentData = req.body;

        const student = new Student ({
            ...studentData
        });
        // --- hashing the password --- /
        const hashedPassword = await bcrypt.hash(studentData.password, 10);
        student.password = hashedPassword;

        await student.save();

        res.send({message: "Student registered successfully", data: student});

    } catch (error) {

        console.log("Error: ", error);
        res.send({message: "Error while signing up",error: error.message});
    }
});

module.exports = Router;