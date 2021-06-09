import React, { useContext } from "react";
import prev from "../../assets/images/prev.png";
import next from "../../assets/images/next.png";
import bell from "../../assets/images/bell.png";
import CourseCardDB from "../../components/CourseCardDB/CourseCardDB";
import Search from "../../components/Search/Search";
import { AuthContext } from "../../contexts/AuthContext";
import "./Dashboard.scss";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <div className="dashboard__welcome">
        <div className="dashboard__welcome-greet">
          <img
            className="dashboard__welcome-greet--userpic"
            src={user.user.photoURL}
            alt="user-pic"
          />
          <div className="dashboard__welcome-greet--username">
            Welcome {user.user.displayName}
          </div>
        </div>
        <img
          className="dashboard__welcome-notification"
          src={bell}
          alt="notification"
        />
      </div>
      <div className="dashboard__watching">
        <CourseCardDB />
        <img className="dashboard__watching-icon1" src={prev} alt="previous" />
        <img className="dashboard__watching-icon2" src={next} alt="next" />
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
      </div>
    </div>
  );
}

export default Dashboard;
