import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../images/Carousel1.jpg";
import img2 from "../../images/Carousel2.jpg";
import img3 from "../../images/Carousel4.jpg";
import "./Carousel.scss";

export function CarouselFunc() {
  return (
    <Carousel
      className="main"
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      showArrows={false}
      stopOnHover={false}
    >
      <div className="image">
        <img
          src={img1}
          alt="pics"
        />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div className="image">
        <img
          src={img2}
          alt="pics"
        />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div className="image">
        <img
          src={img3}
          alt="pics"
        />
        {/* <p className="legend">Legend 3</p> */}
      </div>
    </Carousel>
  );
}
