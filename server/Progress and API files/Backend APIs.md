# You can find all the CLoudinary's backend API endpoints below:

## ** Base URL (Live Server): https://cloudversity-api-server.herokuapp.com **

## ** Base URL (Localhost): http://localhost:5233 **

## Student

**Student Login** ==> POST: "/stu/login"
**Student Signup** ==> POST: "/stu/signup"
**Get all students** ==> GET: "/stu/allstudents"
**Add to wishlist** ==> POST: "stu/addtowishlist/:courseId"
**Remove from wishlist** ==> DELETE: "stu/removefromwishlist/:courseId"
**Add a course to cart** ==> POST: "stu/addtocart/:courseId"
**To Remove from cart** ==> PATCH: "stu/removefromcart/:courseId"
**Latest viewed course** ==> POST: "stu/latestcourse/:courseId"
**to get a single Student** ==> GET: "stu/:studentId"

## Tutor

**Tutor Login** ==> POST: "/tut/login"
**Tutot Signup** ==> POST: "/tut/signup"
**Get all tutors** ==> GET: "/tut/alltutors"

## Course

**To Get All Courses** ==> GET: "/allcourses"
**To Get single course** ==> GET: "/courses/:courseId"
**To Add a course** ==> POST: "/addcourse"
**To Add a course video** ==> POST: "/uploadvideo/:courseId"
**To Enroll to a course** ==> POST: "/enroll/:courseId"
**To Update a course** ==> PATCH: "/updatecourse/:courseId"
**To Update thumbnail** ==> PATCH: "/updatethumbnail/:courseId"
**To Delete a video** ==> DELETE: "/deletevideo/:videoId"
**to Apply discount** ==> PATCH: "/applydiscount/:courseId"
**to Delete a course** ==> DELETE: "/deletecourse/:courseId"
**course Payment route** ==> POST: "/payment"

## Reviews

**To Add a review** ==> POST: "/addreview/:courseId"
**To Update a review** ==> PATCH: "/editreview/:reviewId"
**To Delete a review** ==> DELETE: "/deletereview/:reviewId"
**To Fetch all review of a course** ==> GET: "/allreviews/:courseId"

## Profile

**Update Profile info** ==> PATCH: "/updateprofile/:id"
**Update Profile image** ==> PATCH: "/updatedp/:id"
