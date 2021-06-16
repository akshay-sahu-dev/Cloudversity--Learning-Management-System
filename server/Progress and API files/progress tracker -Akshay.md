# You can check the date-wise changes, modifications and progess below:

## Features and modifcations (8th June):

- Added Login and signup page in react
- Added logic for handling the fetch request
- Tested post request from Login and signup routes
- Added google oAuth
- create Auth client Id and added it in dotenv file inside react
- Added a google login button and tested it

## Features and modifcations (9th June):

- Added enrolledCourses in student schema
- Added createdCourses in tutor Schema
- Added logic to add new created courses to tutorSchema inside add-course route
- Added videoList array to courseSchema
- Added Video schema
- Made add videos route
- Added imageupload and video upload logic in multer
- Added cloudinary config file in Utils folder
- Added bufferConversion file in Utils folder
- Added clodinary creds in dotenv file
- integrated image and video upload to cloudinary
- Added logic to calculate video length
- # Linked authorId and courseId to videoSchema

## Features and modifcations (10th June):

- Added enrolledStudents under courseSchema
- Added yourReviews in studentSchema
- Added Reviews Schema
- Added add-review Route
- Tried populate chaining in GET all-courses
- Added GET course by courseId route and populated the videos, authorName and reviews field
- Added POST enroll Course route (inside courses)
- changed studentInfo and tutuorInfo to data in respective login routes (rec. by Pratik)
- Google users are now successfully added to DB and signup Login is working
- Added profileImg property to tutor and student Schema

## Features and modifications (11th and 12th June)

- Schema Modified: videoSchema => added profileId
- Changed few Route names:  
   add-course to addcourse ,
  all-courses to allcourses,
  upload-video to uploadvideo
  add- review to addreview
- Deployed backend server in Heroku
- Added api folder in source which have all the fetch requests that we may use
- Replaced fetch with axios
- Made actionTypes folder which will have all the action types
- Rewrote all the fetch calls in login-signup page using newly created axios requests
- Added Google Login component to Signup button
- Replaced type with respective action-types imported from actiontypes folder
- Changed all the ES5 functions to Arrow functions inside loginSignup.js
- After signup user will be redirected to dashboard in 1s
- Created a route to update the course details
- Create a route to update the thumbnail
- Updated get, post and patch comments in course routes
- Updated all the local server changes to deployed server
- Made changes in Auth Reducer file
- Made changes in dashboard
- Saved the profile data in the local Storage along with token
- Updating user state using data from local storage
- Added click event on logout button (LeftContainer) and made a logout function as well - currently having issues(**RESOLVED**)

Dependencies to install: axios, jwt-decode

## Features and modifications (12th and 13th June)

- Added patch and delete routes for editing and deleting a review
- Added route to get all the reviews for a particular course
- Added a route to delete a video (Cloudinary delete is implemeted as well)
- Added a pre function to calculate the total subscriptions of a course
- Added logic to calculate the course ratings inside pre function
- Updated the deployed link with latest changes

## Features and modifications (14th June):

- Added wishlist to studentSchema
- Added lastViewed course to student schema
- Added wishlisted to courseSchema
- Added cart to student Schema
- Added route to get list of all the students
- Added route to get list of all the tutors
- Added route to Add a course to wishlist
- Added route to remove the course from wishlist
- Added route to add a course to cart
- Added a route to remove a course from cart
- Added route for updating the last viewed course
- Added logic for verifying the token sent via headers in auth middlewre
- Changed the logic for calculating rating as the previous one was incorrect
- Added CORS related middleware to eliminate cross origin errors
- Modified the addcourse route to enable thumbnail uploading
- Added logic to calculate the course duration based on number of videos
