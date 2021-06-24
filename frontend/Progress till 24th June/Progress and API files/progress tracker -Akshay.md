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

- Added progress tracker and API endpoints file in front-end-dev branch
- Added favoriteCourse property to student Shchema
- Add likedBy property to course Schema
- Made Route for profile update
- Made route for changing DP
- Made a profile Schema
- Added profileInfo property to both student and tutor Schema
- Tested both the endpoints - Working fine!
- Pushed all the latest backend contents to the deployed server
