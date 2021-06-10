import React from "react";
import "./CourseDetails.scss";

function CourseDetails() {
  return (
    <div className="details">
      <div className="details__title"></div>
      <div className="details__content">
        <div className="details__content-left">
          <div className="details__content-left--video"></div>
          <div className="details__content-left--info"></div>
        </div>
        <div className="details__content-right">
          <div className="details__content-right--videos">
            <h4>Contents</h4>
            <div className="video active">
              <small>Introduction</small>
              <small>02:30</small>
            </div>
            <div className="video">
              <small>Introduction</small>
              <small>02:30</small>
            </div>
            <div className="video">
              <small>Introduction</small>
              <small>02:30</small>
            </div>
            <div className="video">
              <small>Introduction</small>
              <small>02:30</small>
            </div>
            <div className="video">
              <small>Introduction</small>
              <small>02:30</small>
            </div>
            <div className="video">
              <small>Introduction</small>
              <small>02:30</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
