import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import images from "../../assets/images";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";
import "./UserType.scss";

export function UserType({ tutorSelected, studentSelected }) {
  const { user } = useContext(AuthContext);
  const { student, tutor } = images;

  return !user ? (
    <div className="type">
      <div className="type__tutor">
        <img className="type__tutor-img" src={tutor.src} alt={tutor.alt} />
        <Link onClick={tutorSelected} to="/auth" className="type__tutor-name">
          LogIn/SignUp as <strong>Tutor</strong>
        </Link>
      </div>
      <div className="type__student">
        <img
          className="type__student-img"
          src={student.src}
          alt={student.alt}
        />
        <Link
          onClick={studentSelected}
          to="/auth"
          className="type__student-name"
        >
          LogIn/SignUp as <strong>Student</strong>
        </Link>
      </div>
    </div>
  ) : (
    <Redirect to="/dashboard" />
  );
}
