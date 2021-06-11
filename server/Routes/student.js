const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const Student = require('../Model/student');


// ---------- Student Signup Route ---------- //
Router.post('/signup', async (req, res) => {
    try {
        const studentData = req.body;
        
        let student = await Student.findOne({ email: req.body.email });
        if (student) {
            return res.send({ message: "This email is already registered, try sign in", error: "Email already in use" });
        };

        student = new Student ({
            ...studentData
        });
        // --- hashing the password --- /
        const hashedPassword = await bcrypt.hash(studentData.password, 10);
        student.password = hashedPassword;

        await student.save();

        res.send({ message: "Student registered successfully", studentInfo  : student});

    } catch (error) {

        console.log("Error: ", error);
        res.send({message: "Error while signing up",error: error.message});
    }
});

// ---------- Student Login Route ---------- //

Router.post('/login', async (req, res) => {
    try {

        // const loginData = req.body;

        const student = await Student.findOne({email: req.body.email});
        console.log("Student obj from student Login: ", student);

        if (!student) {
            return res.status(404).send({message: "This email is not registered with us, please signup first!", error: "Email not registered"});
        } 

        // --- Validatig password using bcryptjs --- /
        const isValidPassword = await bcrypt.compare(req.body.password, student.password);

        if (!isValidPassword) {
            return res.status(400).send({ message: "Invalid Password", error: "Invalid Password"});
        }

        // --- Generating token and saving it in cookie --- /
        const token = await jwt.sign({ id: student._id, email: student.email }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true, maxAge: 1000000 });

        res.status(200).send({message: "Student successfully logged in", studentInfo:student, token})
        
    } catch (error) {

        console.log("Error during Login ==> ", error);
        res.send({ message:"Error during Login", error:error.message});
    }
});



module.exports = Router;