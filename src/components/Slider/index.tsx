import Slick from "react-slick";
import { Card } from "../../components/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../Arrows";

import Img1 from "../../assets/product/img-1.jpg";
import Img2 from "../../assets/product/img-2.jpg";

export function Slider() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section>
      <h1>Tendências</h1>
      <Slick {...settings}>
          <Card
            firstImage={Img1}
            secondImage={Img2}
            tag="hot"
            price="R$49.99"
            oldPrice="R$74.99"
            name="Men's Jacket"
            discount="-30%"
          />
          <Card
            firstImage={Img1}
            secondImage={Img2}
            tag="hot"
            price="R$49.99"
            oldPrice="R$74.99"
            name="Men's Jacket"
            discount="-30%"
          />
          <Card
            firstImage={Img1}
            secondImage={Img2}
            tag="hot"
            price="R$49.99"
            oldPrice="R$74.99"
            name="Men's Jacket"
            discount="-30%"
          />
          <Card
            firstImage={Img1}
            secondImage={Img2}
            tag="hot"
            price="R$49.99"
            oldPrice="R$74.99"
            name="Men's Jacket"
            discount="-30%"
          />
      </Slick>
    </section>
  );
}
