import React, { useContext, useEffect } from "react";
import { Search, CourseCard } from "../../components";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";
import { StateContext } from "../../stateHandling/contexts/StateContext";
import { fetchCoursesFromDB } from "../../stateHandling/utils/serverRequests";
import "./Home.scss";

export function Home() {
  const {
    state: { courses, wishListItems, cartItems },
  } = useContext(StateContext);
  console.log("Course list from Home: ", courses, wishListItems, cartItems)

  const { dispatch } = useContext(StateContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCoursesFromDB(dispatch);
  }, [dispatch]);

  return (
    <div className="home">
      <div className="home__brand">
        <h2>CloudVersity</h2>
        <Search />
      </div>
      <div
        style={{
          margin: "0 0 0 0",
          borderBottom: "1px solid black",
          display: "inline-block",
        }}
      >
        Recommended
      </div>
      <div className="home__scroll">
        {courses.length ? (
          courses.map((course) => {
            const id = course._id;
            const isItWishlistItem = !!wishListItems?.filter(
              (item) => item._id === id
            ).length;
            const isItCartItem = !!cartItems?.filter((item) => item._id === id)
              .length;
            return (
              <CourseCard
                key={id}
                course={course}
                user={user}
                dispatch={dispatch}
                isItCartItem={isItCartItem}
                isItWishlistItem={isItWishlistItem}
              />
            );
          })
        ) : (
          <div>No courses found</div>
        )}
      </div>
      <div
        style={{
          margin: "1rem 0 0 0",
          borderBottom: "1px solid black",
          display: "inline-block",
        }}
      >
        Popular
      </div>
      <div className="home__scroll"></div>
    </div>
  );
}
