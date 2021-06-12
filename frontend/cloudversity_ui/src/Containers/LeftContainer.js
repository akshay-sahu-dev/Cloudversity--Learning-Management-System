import React, { useContext, useState, useEffect, useCallback } from "react";
import home from "../assets/images/home.png";
import menu from "../assets/images/menu.png";
import c from "../assets/images/c.png";
import profile from "../assets/images/profile.png";
import logout from "../assets/images/logout.png";
import decode from "jwt-decode"; // new library added
import { AuthContext } from "../contexts/AuthContext";
import { LOGOUT } from "../actionTypes";
import { useHistory } from 'react-router-dom';
import "./styles.scss";

function LeftContainer() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = useCallback(() => {

    dispatch({ type: LOGOUT });
    history.push('/check-user');

  },[dispatch, history]);
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }

  }, [handleLogout, user]);



  return (
    <div className="leftContainer">
      <img className="leftContainer__icon" src={c} alt="c-icon" />
      <img className="leftContainer__icon" src={home} alt="home-icon" />
      <img className="leftContainer__icon" src={menu} alt="menu-icon" />
      <img className="leftContainer__icon" src={profile} alt="profile-icon" />
      <img className="leftContainer__icon" src={logout} alt="logout-icon" onClick={handleLogout}/>
    </div>
  );
}

export { LeftContainer };
