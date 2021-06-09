import React from "react";
import "./CourseCard.scss";

function CourseCard() {
  return (
    <div className="course">
      <img
        className="course__img"
        src={
          "https://images.unsplash.com/photo-1581291519195-ef11498d1cf2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        }
        alt="course-img"
      />
      <div className="course__contents">
        <div className="course__contents-details">
          <p>700 students</p>
          <p>6h 30m</p>
        </div>
        <div className="course__contents-name">Principles of UI/UX Design</div>
        <div className="course__contents-author">
          <p>John Walker</p>
          <div>❤️</div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
