import React from "react";
import images from "../../assets/images";
import "./TutorCard.scss";

export function TutorCard({ course }) {
  const { fire } = images;
  const { courseName, thumbnail, rating } = course;

  return (
    <>
      <div className="tutorCard__firstDiv">
        <img
          className="tutorCard__firstDiv-img"
          src={thumbnail}
          alt="course-pic"
        />
        <div className="tutorCard__firstDiv-text">
          <div>{courseName}</div>
          <div>Created at date</div>
        </div>
      </div>
      <div className="tutorCard__secondDiv">
        <img className="leftContainer__icon" src={fire.src} alt={fire.alt} />
        <span>{rating}</span>
      </div>
    </>
  );
}
