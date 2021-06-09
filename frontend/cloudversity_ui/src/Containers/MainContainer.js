import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";

function MainContainer() {
  const { user } = useContext(AuthContext);

  return (
    <div className="mainContainer">
      <Switch>
        <Route exact path="/" component={Home} />
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
