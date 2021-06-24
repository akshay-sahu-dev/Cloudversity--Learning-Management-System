import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router";
// import images from "../../assets/images";
import { CourseCardDB } from "../../components";
import { TutorDashboard } from "../TutorDashboard/TutorDashboard";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";
import "./Dashboard.scss";
import {
  fetchCartFromDB,
  fetchEnrolledCoursesFromDB,
  fetchWishListFromDB,
  updateLastestViewedCourse,
} from "../../stateHandling/utils/serverRequests";
import { StateContext } from "../../stateHandling/contexts/StateContext";

export function Dashboard() {
  const { user } = useContext(AuthContext);
  const {
    state: { courses, enrolledCourses, wishListItems, cartItems },
    dispatch,
  } = useContext(StateContext);

  // const { prev, next } = images;

  useEffect(() => {
    if (user) {
      if (user.user.role === "student") {
        fetchWishListFromDB(user, dispatch);
        fetchCartFromDB(user, dispatch);
        fetchEnrolledCoursesFromDB(user, dispatch);
      }
    }
  }, [user, dispatch]);

  return !user ? (
    <Redirect to="/usertype" />
  ) : user?.user.role === "student" ? (
    <div className="dashboard">
      <div className="dashboard__header">
        <div className="dashboard__header-stats">
          <span className="dashboard__header-stats--count">
            {enrolledCourses.length}
          </span>
          <span className="dashboard__header-stats--name">
            Enrolled Courses
          </span>
        </div>
        <div className="dashboard__header-stats">
          <span className="dashboard__header-stats--count">
            {wishListItems.length}
          </span>
          <span className="dashboard__header-stats--name">Liked Courses</span>
        </div>
        <div className="dashboard__header-stats">
          <span className="dashboard__header-stats--count">
            {cartItems.length}
          </span>
          <span className="dashboard__header-stats--name">
            Courses waiting in Cart
          </span>
        </div>
        <div className="dashboard__header-stats">
          <span className="dashboard__header-stats--count">
            {user.user.yourReviews.length}
          </span>
          <span className="dashboard__header-stats--name">Reviews Given</span>
        </div>
        <div className="dashboard__header-stats">
          <span className="dashboard__header-stats--count">10</span>
          <span className="dashboard__header-stats--name">
            Enrolled Courses
          </span>
        </div>
      </div>

      <div className="dashboard__courses">
        <div className="dashboard__courses-enrolled">
          <div className="dashboard__courses-enrolled--heading">
            Courses You've Enrolled
          </div>
          <div className="dashboard__courses-enrolled--content">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((course) => (
                <CourseCardDB
                  key={course._id}
                  course={course}
                  updateLastestViewedCourse={updateLastestViewedCourse}
                />
              ))
            ) : (
              <div>No courses to show</div>
            )}
          </div>
        </div>
        <div className="dashboard__courses-recommend">
          <div className="dashboard__courses-enrolled--heading">
            Recommended Courses For You
          </div>
          <div className="dashboard__courses-enrolled--content">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCardDB
                  key={course._id}
                  course={course}
                  updateLastestViewedCourse={updateLastestViewedCourse}
                />
              ))
            ) : (
              <div>No courses to show</div>
            )}
          </div>
        </div>
      </div>

      {/* 
      <div className="dashboard__watching">
        <CourseCardDB />
        <img
          className="dashboard__watching-icon1"
          src={prev.src}
          alt={prev.alt}
        />
        <img
          className="dashboard__watching-icon2"
          src={next.src}
          alt={next.alt}
        />
      </div>
      <div className="dashboard__courseList">
        <div className="dashboard__courseList-category">
          <div>
            <span>All Courses</span>
            <span>Most Popular</span>
            <span>Top Rated</span>
            <span>Newest</span>
          </div>
          <Search />
        </div>
        <div className="dashboard__courseList-scroll">
          <CourseCardDB />
          <CourseCardDB />
          <CourseCardDB />
          <CourseCardDB />
          <CourseCardDB />
          <CourseCardDB />
        </div>
      </div> */}
    </div>
  ) : (
    <TutorDashboard user={user} />
  );
}
