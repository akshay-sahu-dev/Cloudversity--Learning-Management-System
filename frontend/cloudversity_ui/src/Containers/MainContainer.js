import React from "react";
import { Switch, Route } from "react-router-dom";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import LoginSignup from "../pages/LoginSignup/LoginSignup";

function MainContainer() {
  return (
    <div className="mainContainer">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/details" component={CourseDetails} />
        <Route path="/check-user" component={LoginSignup} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export { MainContainer };
