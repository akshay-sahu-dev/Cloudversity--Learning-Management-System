import React from "react";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import "./CourseCardDB.scss";

export function CourseCardDB() {
  const { web_dev, clock, star } = images;
  return (
    <div className="coursedb">
      <img className="coursedb__img" src={web_dev.src} alt={web_dev.alt} />
      <div className="coursedb__name">
        <h3 className="coursedb__name-title">Learn Web</h3>
        <p className="coursedb__name-author">by Brad Traversery</p>
      </div>
      <div className="coursedb__time">
        <img className="coursedb__time-icon" src={clock.src} alt={clock.alt} />
        <p>6h 30min</p>
      </div>
      <div className="coursedb__time">
        <img className="coursedb__time-icon" src={clock.src} alt={clock.alt} />
        <p>10 modules</p>
      </div>
      <div className="coursedb__rating">
        <img className="coursedb__rating-icon" src={star.src} alt={star.alt} />
        <p>4.9</p>
      </div>
      {/* <button className="coursedb__viewBtn">View Course</button> */}
      <Link to="details">
        <button className="coursedb__viewBtn">View Course</button>
      </Link>
    </div>
  );
}
