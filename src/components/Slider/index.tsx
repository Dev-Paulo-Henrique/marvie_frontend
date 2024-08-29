import Slick from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../Arrows";

export function Slider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
    customPaging: function(i: number) {
      return (
        <div>
          <img
            src={`https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big${i + 1}.webp`}
            alt={`Thumbnail ${i + 1}`}
          />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
  };

  const images = ["big1.webp", "big2.webp", "big3.webp", "big4.webp"];

  return (
    <aside className="col-lg-6">
      <Slick {...settings}>
        {images.map((img, index) => (
          <div
            key={index}
            className="border mb-3 d-flex justify-content-center"
          >
              <img
                className="rounded-4 img-fluid"
                src={`https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/${img}`}
                alt={`Main product ${index + 1}`}
              />
          </div>
        ))}
      </Slick>
    </aside>
  );
}
