import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../stateHandling/contexts/StateContext";
import "./Search.scss";

export function Search({ setFilteredCourses }) {
  const [searchText, setSearchText] = useState("");
  const {
    state: { courses },
  } = useContext(StateContext);

  useEffect(() => {
    if (searchText === "") {
      setFilteredCourses(courses);
    }
  }, [searchText, courses, setFilteredCourses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilteredCourses(
      [...courses].filter((course) =>
        course.courseName.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search Courses..."
        />
      </form>
    </>
  );
}
