import React from "react";
import home from "../assets/images/home.png";
import menu from "../assets/images/menu.png";
import c from "../assets/images/c.png";
import profile from "../assets/images/profile.png";
import logout from "../assets/images/logout.png";
import "./styles.scss";

function LeftContainer() {
  return (
    <div className="leftContainer">
      <img className="leftContainer__icon" src={c} alt="c-icon" />
      <img className="leftContainer__icon" src={home} alt="home-icon" />
      <img className="leftContainer__icon" src={menu} alt="menu-icon" />
      <img className="leftContainer__icon" src={profile} alt="profile-icon" />
      <img className="leftContainer__icon" src={logout} alt="logout-icon" />
    </div>
  );
}

export { LeftContainer };
