const Tutor = require("../Model/tutor");
const Student = require("../Model/student");
const { cloudinary } = require("../Utils/clodinary");

module.exports = {

    updateProfile: async (req, res) => {

        try {

            const student = await Student.findById({ _id: req.params.id });
            const tutor = await Tutor.findById({ _id: req.params.id });

            if (student) {
                student.profileInfo = { ...req.body };
                await student.save();
            } else {
                tutor.profileInfo = { ...req.body };
                await tutor.save();
            }

            res.status(200).send({ message: "Profile updated", profileInfo: req.body });

        } catch (error) {
            console.log("Error while updating profile", error);
            res.status(500).send({ message: "Error in updating profile", error: error.message });
        };
    },

    updateProfileImage: async (req, res) => {
        try {
            const student = await Student.findById({ _id: req.params.id });
            const tutor = await Tutor.findById({ _id: req.params.id });

            const uploadedImage = await cloudinary.uploader.upload(req.body.profileImg, { resource_type: "image", upload_preset: "cloudversity-dev", });

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
    },



}