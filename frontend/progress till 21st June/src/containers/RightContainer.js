import React from "react";

export function RightContainer() {
  return (
    <div className="rightContainer">
      {/* <h3>toggle</h3> */}
      <div className="rightContainer__container">
        <div className="rightContainer__container-btns">
          <button>Profile</button>
          <button>Discussion</button>
        </div>
      </div>
      <div className="rightContainer__container">
        <p style={{ fontSize: "3rem", fontWeight: "600" }}>11</p>
        <p>Enrolled Courses</p>
      </div>
      <div className="rightContainer__container">
        <p style={{ fontSize: "3rem", fontWeight: "600" }}>50</p>
        <p>Reviews given</p>
      </div>
      <div className="rightContainer__container">
        <p style={{ fontSize: "3rem", fontWeight: "600" }}>4</p>
        <p>Items in Wishlist</p>
      </div>
      <div className="rightContainer__container">
        <p style={{ fontSize: "3rem", fontWeight: "600" }}>10</p>
        <p>Items in Cart</p>
      </div>
    </div>
  );
}
