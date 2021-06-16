const express = require("express");
const Router = express.Router();
const auth = require("../Auth/auth");
const Course = require("../Model/course");
const Video = require("../Model/video");
const Tutor = require("../Model/tutor");
const Student = require("../Model/student");
const bufferConversion = require("../Utils/bufferConversion");
const { imageUpload, videoUpload } = require("../Utils/multer");
const { cloudinary } = require("../Utils/clodinary");


//-------------- COURSE AND VIDEO ROUTES BELOW ---------------- //

// ------------------- POST: Add a New Course ------------------//
Router.post("/addcourse", auth, async (req, res) => {

    try {

        console.log("User details provided during AUTH: ", req.user);
 
        const course_data = new Course({
            ...req.body
        });

        // const convertedBuffer = await bufferConversion(req.file.originalname, req.file.buffer);

        const uploadedImage = await cloudinary.uploader.upload(req.body.thumbnail, { upload_preset: "cloudversity-dev", });

        console.log("Cloudversity response: ", uploadedImage);

        course_data.thumbnail = uploadedImage.secure_url;
        course_data.authorName = req.user.id;

        await course_data.save();

        const tutor = await Tutor.findById({ _id: req.user.id });
        tutor.createdCourses.push(course_data._id);

        await tutor.save();

        res.status(200).send({ message: "Congratulations...New course added!", courseData: course_data });

    } catch (error) {
        console.log("Error while creating course: ", error);

        res.send({ message: "Couldn't create the course", error: error.message });
    };

});

// ------------------- GET: get All Courses ------------------//
Router.get("/allcourses", async (req, res) => {
    try {
        const courseData = await Course.find()
            .populate("videos", ["videoLink", "title", "videoLength", "publicId"])
            .populate("reviews", ["reviewBody", "rating"])
            .populate("authorName", ["firstName", "lastName", "createdCourses"])
            .populate("wishlistedBy")   // chaining populate to get multiple fields populated
            .exec();

        res.send({ message: "Fetched successfully", data: courseData });

    } catch (error) {

        console.log("Error: ", error);
        res.status(400).send({ message: "Error while fetching", error: error.message });
    };
});


// ------------------- GET: get Course by courseId -----------------//
Router.get("/course/:courseId", async (req, res) => {
    try {

        const requestedCourse = await Course.findById({ _id: req.params.courseId })
            .populate("reviews", ["reviewBody", "rating"])
            .populate("videos", ["videoLink", "title", "publicId"])
            .populate("authorName", ["firstName", "lastName"])
            .populate("wishlistedBy")
            .exec();

        res.status(200).send({ requestedCourse });

    } catch (error) {
        console.log("Error occurred while fetching the course...", error);
        res.status(500).send({ message: "Couldn't fetch the course", error: error.message });
    };
});

// ------------------- POST: Enroll to Course ---------------//
Router.post("/enroll/:courseId", auth, async (req, res) => {

    try {

        const course = await Course.findById({ _id: req.params.courseId });
        const student = await Student.findById({ _id: req.user.id });

        if (!course.enrolledStudents.includes(req.user.id)) {

            course.enrolledStudents.push(req.user.id);
            student.enrolledCourses.push(req.params.courseId);
            await course.save();
            await student.save();
            res.status(200).send({ message: "New course enrolled successfully", enrolledCourses: student.enrolledCourses });
        }
        res.status(200).send({message: "Student already enrolled to this course"});

    } catch (error) {
        console.log("Error occurred while enrolling...", error);
        res.status(500).send({ message: "Couldn't enroll to the course", error: error.message });
    };

});

// ------------------- PATCH: Course details Update ---------------//
Router.patch("/updatecourse/:courseId", auth, async (req, res) => {

    try {

        const updatedDetails = {
            ...req.body
        }
        const updatedCourse = await Course.findOneAndUpdate({ _id: req.params.courseId }, {
            $set: updatedDetails
        });

        res.status(200).send({ message: "Course details updated successfully!", updatedDetails });


    } catch (error) {
        console.log("Error occurred while updating...", error);
        res.status(500).send({ message: "Couldn't update the course", error: error.message });
    };
});


// ------------------- PATCH: Course Thumbnail Update ---------------//
Router.patch("/updatethumbnail/:courseId", auth, imageUpload.single('thumbnail'), async (req, res) => {

    try {

        const convertedBuffer = await bufferConversion(req.file.originalname, req.file.buffer);

        const uploadedImage = await cloudinary.uploader.upload(convertedBuffer, { resource_type: "image", upload_preset: "cloudversity-dev", });

        const thumbnailUpdate = await Course.findOneAndUpdate({ _id: req.params.courseId }, {
            $set: {
                thumbnail: uploadedImage.secure_url
            }
        });

        res.status(200).send({ message: "thumbnail updated", thumbnail: uploadedImage.secure_url });

    } catch (error) {
        console.log("Error occurred while updating thumbnail...", error);
        res.status(500).send({ message: "Couldn't update the thumbnail", error: error.message });
    };
});

// ------------------- POST: Upload Videos ---------------//
Router.post("/uploadvideo/:courseId", auth, async (req, res) => {

    try {

        const video = new Video({
            title: req.body.title
        });

        // const convertedBuffer = await bufferConversion(req.file.originalname, req.file.buffer);
        // console.log("req.file.buffer: ",req.file.buffer);
        // console.log("convertedBuffer: ", convertedBuffer);  Don't ever uncomment this :-P

        const uploadedVideo = await cloudinary.uploader.upload(req.body.videoLink, { resource_type: "video", upload_preset: "cloudversity-dev", });

        console.log("Uploaded video object: ", uploadedVideo)
        video.courseId = req.params.courseId;
        video.authorId = req.user.id;

        // if (uploadedVideo.duration > 60) {
        //     videoLength = (uploadedVideo.duration / 60).toFixed(2);
        // } else {
        //     videoLength = uploadedVideo.duration
        // };

        videoLength = (uploadedVideo.duration / 60).toFixed(3);

        console.log("Video Length : ", videoLength);

        video.videoLength = videoLength;
        video.videoLink = uploadedVideo.secure_url;
        video.publicId = uploadedVideo.public_id.split("/")[1];   // NEW: added public Id to video Schema

        await video.save();

        const course = await Course.findById({ _id: req.params.courseId }).populate("videos", ["videoLength"]);
        
        // ----- Logic to calculate the course duration ----- //
        const courseDuration = course.videos.reduce((sum, video) => {
            return sum + video.videoLength;
        }, 0) + parseFloat(videoLength);

        course.courseDuration = courseDuration.toFixed(3);
        course.videos.push(video._id);
        await course.save();

        res.status(201).send({ message: "Video uploaded successfully", videoDetails: video });

    } catch (error) {

        console.log("Error occurred while uploading...", error);
        res.status(500).send({ message: "Couldn't upload the video", error: error.message });

    };
});

// ------------------- DELETE: Route to Delete a Video ------------------- //
Router.delete("/deletevideo/:videoId", auth, async (req, res) => {
    try {
        
        const videoToDelete = await Video.findById({_id: req.params.videoId});

        const deletedVideo = await cloudinary.uploader.destroy(videoToDelete.publicId, { resource_type: 'video', upload_preset: "cloudversity-dev"});

        const deleteVideo = await Video.findOneAndDelete({_id: req.params.videoId});

        res.status(200).send({message: "Sucess! The video has been deleted"});

    } catch (error) {
        console.log("Error occurred while deleting the video...", error);
        res.status(500).send({ message: "Couldn't delete the video, try again", error: error.message });
    };
});

Router.patch("/applydiscount/:courseId", auth, async(req, res) => {
    try {
        
        const course  = await Course.findById({_id: req.params.courseId});
        course.discount = req.body.discount;
        await course.save();

        res.status(200).send({message: `${req.body.discount}% discount applied on course`, course});
        
    } catch (error) {
        console.log("Error occurred while applying discount...", error);
        res.status(500).send({ message: "Couldn't apply discount, try again", error: error.message });
    };
});

module.exports = Router;
