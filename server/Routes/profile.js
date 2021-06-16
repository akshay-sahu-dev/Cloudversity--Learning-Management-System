const express = require("express");
const Router = express.Router();
const auth = require("../Auth/auth");
const Tutor = require("../Model/tutor");
const Student = require("../Model/student");
const Profile = require("../Model/profile");
const bufferConversion = require("../Utils/bufferConversion");
const { imageUpload } = require("../Utils/multer");
const { cloudinary } = require("../Utils/clodinary");


// ------------------- PATCH: Route to update the profile ------------------- //
Router.patch("/updateprofile/:id", auth, async (req, res) => {
    
    try {
        
        const student = await Student.findById({_id:req.params.id});
        const tutor = await Tutor.findById({ _id: req.params.id });

        if (student) {
            student.profileInfo = {...req.body} ;
            await student.save();
        } else {
            tutor.profileInfo = {...req.body};
            await tutor.save();
        }

        res.status(200).send({message: "Profile updated", profileInfo: req.body});

    } catch (error) {
        console.log("Error while updating profile", error);
        res.status(500).send({message: "Error in updating profile", error:error.message});
    };
});

// ------------------- PATCH: Route to update the dp ------------------- //
Router.patch("/updatedp/:id", auth, imageUpload.single("profileImg"), async (req, res) => {
    try {
        const student = await Student.findById({ _id: req.params.id });
        const tutor = await Tutor.findById({ _id: req.params.id });

        const convertedBuffer = await bufferConversion(req.file.originalname, req.file.buffer);

        const uploadedImage = await cloudinary.uploader.upload(convertedBuffer, { resource_type: "image", upload_preset: "cloudversity-dev", });

        if (student) {
            student.profileImg = uploadedImage.secure_url;
            await student.save();
        } else {
            tutor.profileImg = uploadedImage.secure_url;
            await tutor.save();
        }

        res.send({ message: "Profile image updated", profileImage: uploadedImage.secure_url });

    } catch (error) {
        console.log("Error while updating profile Image", error);
        res.status(500).send({ message: "Error in updating profile Image", error: error.message });
    };
});

module.exports = Router;