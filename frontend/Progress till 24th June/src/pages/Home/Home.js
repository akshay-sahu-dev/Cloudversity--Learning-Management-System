import React, { useContext, useEffect, useState } from "react";
import images from "../../assets/images";
import { Search, CourseCard } from "../../components";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";
import { StateContext } from "../../stateHandling/contexts/StateContext";
import { CarouselFunc } from "../../components";
import { fetchCoursesFromDB } from "../../stateHandling/utils/serverRequests";
import "./Home.scss";

export function Home({ filteredCourses, setFilteredCourses }) {
  const {
    state: { courses, wishListItems, cartItems, enrolledCourses },
  } = useContext(StateContext);
  const { dispatch } = useContext(StateContext);
  const { user } = useContext(AuthContext);

  const { popular, rated, free, paid, newC } = images;
  console.log(filteredCourses);

  useEffect(() => {
    fetchCoursesFromDB(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (courses.length) {
      setFilteredCourses(courses);
    }
  }, [courses, setFilteredCourses]);

  return (
    <div className="home">
      <CarouselFunc />
      {/* <div className="home__brand">
        <h2>CloudVersity</h2>
        <Search />
      </div> */}
      {/* <div
        style={{
          margin: "0 0 1rem 0",
          borderBottom: "1px solid black",
          display: "inline-block",
        }}
      >
        Recommended
      </div> */}

      <div className="home__filterIcons">
        <div
          className="home__filterIcons-content all"
          onClick={() => setFilteredCourses(courses)}
        >
          All
        </div>
        <div
          className="home__filterIcons-content popular"
          onClick={() =>
            setFilteredCourses(
              [...courses].filter(
                (course) => course.enrolledStudents.length >= 1
              )
            )
          }
        >
          <img src={popular.src} alt={popular.alt} />
          <p>Popular</p>
        </div>
        <div
          className="home__filterIcons-content rated"
          onClick={() =>
            setFilteredCourses(
              [...courses].filter((course) => course.rating >= 1)
            )
          }
        >
          <img src={rated.src} alt={rated.alt} />
          <p>Highest Rated</p>
        </div>
        <div className="home__filterIcons-content new">
          <img src={newC.src} alt={newC.alt} />
          <p>Recently Added</p>
        </div>
        <div
          className="home__filterIcons-content paid"
          onClick={() =>
            setFilteredCourses(
              [...courses].filter((course) => course.price > 0)
            )
          }
        >
          <img src={paid.src} alt={paid.alt} />
          <p>Paid</p>
        </div>
        <div
          className="home__filterIcons-content free"
          onClick={() =>
            setFilteredCourses(
              [...courses].filter((course) => course.price === 0)
            )
          }
        >
          <img src={free.src} alt={free.alt} />
          <p>Free</p>
        </div>
       
      
        <Search setFilteredCourses={setFilteredCourses} />
      </div>

      <div className="home__scroll">

        <div className="home__scroll-grid">
          {filteredCourses.length ? (
            filteredCourses.map((course) => {
              const id = course._id;
              const isItWishlistItem = !!wishListItems?.filter(
                (item) => item._id === id
              ).length;
              const isItCartItem = !!cartItems?.filter(
                (item) => item._id === id
              ).length;
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

      </div>

      {/* <div
        style={{
          margin: "1rem 0 0 0",
          borderBottom: "1px solid black",
          display: "inline-block",
        }}
      >
        Popular
      </div>
      <div className="home__scroll"></div> */}
    </div>
  );
}
