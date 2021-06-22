import React, { useState } from "react";
import "./Search.scss";

export function Search() {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
