import React from "react";
import { Link } from "react-router-dom";
import images from "../assets/images";
import "./styles.scss";

export function LeftContainer() {
  const { home, menu, profile, logout } = images;

  return (
    <div className="leftContainer">
      <div className="leftContainer__iconsAssemble">
        <Link to="/">
          <img className="leftContainer__icon" src={home.src} alt={home.alt} />
        </Link>
        <Link to="/dashboard">
          <img className="leftContainer__icon" src={menu.src} alt={menu.alt} />
        </Link>
        <Link to="/usertype">
          <img
            className="leftContainer__icon"
            src={profile.src}
            alt={profile.alt}
          />
        </Link>
      </div>
      <Link to="/">
        <img
          className="leftContainer__icon"
          src={logout.src}
          alt={logout.alt}
        />
      </Link>
    </div>
  );
}
