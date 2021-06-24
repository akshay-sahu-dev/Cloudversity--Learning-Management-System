# You can find all the CLoudinary's backend API endpoints below:

## ** Base URL (Live Server): https://cloudversity-api-server.herokuapp.com **

## ** Base URL (Localhost): http://localhost:5233 **

## Student

**Student Login** ==> POST: "/stu/login"
**Student Signup** ==> POST: "/stu/signup"

## Tutor

**Tutor Login** ==> POST: "/tut/login"
**Tutot Signup** ==> POST: "/tut/signup"

## Course

**To get All Courses** ==> GET: "/allcourses"
**To get single course** ==> GET: "/courses/:courseId"
**To Add a course** ==> POST: "/addcourse"
**To add a course video** ==> POST: "/uploadvideo/:courseId"
**To Enroll to a course** ==> POST: "/enroll/:courseId"
**To Update a course** ==> PATCH: "/updatecourse/:courseId"
**To update thumbnail** ==> PATCH: "/updatethumbnail/:courseId"

## Reviews

**To add a review** ==> POST: "/addreview/:courseId"
**To update a review** ==> PATCH: "/updatereview/:courseId"
**To delete a review** ==> PATCH: "/deletereview/:courseId"

## Profile

**Update profile info** ==> PATCH: "/updateprofile/:id"
**Update profile image** ==> PATCH: "/updatedp/:id"
