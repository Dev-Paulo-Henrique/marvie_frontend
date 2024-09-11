import Slick from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../Arrows";

interface SliderProps {
  images: string[];
}

export function Slider({ images }: SliderProps) {
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
            src={images[i]}
            alt={`Thumbnail ${i + 1}`}
          />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
  };

  return (
    <aside className="col-lg-6 mb-4">
      <Slick {...settings}>
        {images.map((img, index) => (
          <div
            key={index}
            className="border mb-3 d-flex justify-content-center"
          >
            <img
              className="img-fluid"
              src={img}
              alt={`Main product ${index + 1}`}
            />
          </div>
        ))}
      </Slick>
    </aside>
  );
}
