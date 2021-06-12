import React, { useState, useEffect, useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
import prev from "../../assets/images/prev.png";
import next from "../../assets/images/next.png";
import bell from "../../assets/images/bell.png";
import CourseCardDB from "../../components/CourseCardDB/CourseCardDB";
import Search from "../../components/Search/Search";
import { AuthContext } from "../../contexts/AuthContext";
import "./Dashboard.scss";

function Dashboard() {
  let name;
  let dp;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  // const [name, setName] = useState("");
  // const [dp, setDp] = useState("");

//  useEffect(() => {
//    if (user) {
//      setName(`${user.data.firstName} ${user.data.lastName}`);
//      setDp(user.data.profileImg ? user.data.profileImg : `https://ui-avatars.com/api/?name=${user.data.firstName}`);
   
//    }
//  }, []);

  console.log("User from Localstorage:", user);

   if (user) {
     name = `${user.data.firstName} ${user.data.lastName}`;
     dp = user.data.profileImg ? user.data.profileImg : `https://ui-avatars.com/api/?name=${user.data.firstName}`;
  
   }

  return user ? (
    <div className="dashboard">
      <div className="dashboard__welcome">
        <div className="dashboard__welcome-greet">
          <img
            className="dashboard__welcome-greet--userpic"
            src={dp}
            alt="user-pic"
          />
          <div className="dashboard__welcome-greet--username">
            Welcome {name}
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
  ) : (
    <Redirect to="/check-user" />
  );
}

export default Dashboard;
