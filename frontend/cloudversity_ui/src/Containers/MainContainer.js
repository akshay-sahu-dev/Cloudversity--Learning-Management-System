import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import './styles.scss';
function MainContainer() {
  
  const { user } = useContext(AuthContext);

  return (
    <div className="mainContainer">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/details" component={CourseDetails} />
        {user ? (
          <Route path="/dashboard" component={Dashboard} />
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    </div>
  );
}

export default MainContainer;
