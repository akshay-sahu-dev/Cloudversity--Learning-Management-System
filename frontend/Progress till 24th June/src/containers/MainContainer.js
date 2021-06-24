import React, { useContext, useState } from "react";
import { Switch, Route } from "react-router-dom";
import {
  Home,
  CourseDetails,
  LoginSignup,
  Dashboard,
  UserType,
  UpdateCourse,
} from "../pages";
import { Welcome } from "../components";
import { AuthContext } from "../stateHandling/contexts/AuthContext";
import { NewCourse } from "../pages/NewCourse/NewCourse";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";

export function MainContainer({ filteredCourses, setFilteredCourses }) {
  const [selectedUserType, setSelectedUserType] = useState("tut");
  const { user } = useContext(AuthContext);

  const tutorSelected = () => {
    setSelectedUserType("tut");
  };

  const studentSelected = () => {
    setSelectedUserType("stu");
  };

  return (
    <div className="mainContainer">
      {user && <Welcome user={user} />}
      <Switch>
        <Route exact path="/">
          <Home
            filteredCourses={filteredCourses}
            setFilteredCourses={setFilteredCourses}
          />
        </Route>
        <Route path="/details/:id" component={CourseDetails} />
        <Route path="/auth">
          <LoginSignup selectedUserType={selectedUserType} />
        </Route>
        <Route path="/usertype">
          <UserType
            tutorSelected={tutorSelected}
            studentSelected={studentSelected}
          />
        </Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/newcourse" component={NewCourse} />
        <Route path="/updatecourse/:id" component={UpdateCourse} />
        <Route exact path="/cart/:id" component={Cart} />
        <Route exact path="/wishlist/:id" component={Wishlist} />
      </Switch>
    </div>
  );
}
