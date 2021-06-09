import React from "react";
import clock from "../../assets/images/clock.png";
import star from "../../assets/images/star.png";
import web_dev from "../../assets/images/web_dev.jpg";
import "./CourseCardDB.scss";

function CourseCardDB() {
  return (
    <div className="coursedb">
      <img className="coursedb__img" src={web_dev} alt="coursedb__img" />
      <div className="coursedb__name">
        <h3 className="coursedb__name-title">Learn Web</h3>
        <p className="coursedb__name-author">by Brad Traversery</p>
      </div>
      <div className="coursedb__time">
        <img className="coursedb__time-icon" src={clock} alt="time" />
        <p>6h 30min</p>
      </div>
      <div className="coursedb__time">
        <img className="coursedb__time-icon" src={clock} alt="modules" />
        <p>10 modules</p>
      </div>
      <div className="coursedb__rating">
        <img className="coursedb__rating-icon" src={star} alt="ratings" />
        <p>4.9</p>
      </div>
      <button className="coursedb__viewBtn">View Course</button>
    </div>
  );
}

export default CourseCardDB;
