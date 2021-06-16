# You can find all the CLoudinary's backend API endpoints below:

## ** Base URL (Live Server): https://cloudversity-api-server.herokuapp.com **

## ** Base URL (Localhost): http://localhost:5233 **

## Student

**Student Login** ==> POST: "/stu/login"
**Student Signup** ==> POST: "/stu/signup"
**Get all students** ==> GET: "/stu/allstudents"
**Add to wishlist** ==> POST: "/addtowishlist/:courseId"
**Remove from wishlist** ==> DELETE: "/removefromwishlist/:courseId"
**Add to cart** ==> POST: "/addtocart/:courseId"
**Remove from cart** ==> PATCH: "/removefromcart/:courseId"
**Latest viewed course** ==> POST: "/latestcourse/:courseId"

## Tutor

**Tutor Login** ==> POST: "/tut/login"
**Tutot Signup** ==> POST: "/tut/signup"
**Get all tutors** ==> GET: "/tut/alltutors"

## Course

**To get All Courses** ==> GET: "/allcourses"
**To get single course** ==> GET: "/courses/:courseId"
**To Add a course** ==> POST: "/addcourse"
**To add a course video** ==> POST: "/uploadvideo/:courseId"
**To Enroll to a course** ==> POST: "/enroll/:courseId"
**To Update a course** ==> PATCH: "/updatecourse/:courseId"
**To update thumbnail** ==> PATCH: "/updatethumbnail/:courseId"
**To delete a video** ==> DELETE: "/deletevideo/:videoId"

## Reviews

**To add a review** ==> POST: "/addreview/:courseId"
**To update a review** ==> PATCH: "/editreview/:reviewId"
**To delete a review** ==> DELETE: "/deletereview/:reviewId"
**To fetch all review of a course** ==> GET: "/allreviews/:courseId"

## Profile

**Update profile info** ==> PATCH: "/updateprofile/:id"
**Update profile image** ==> PATCH: "/updatedp/:id"
