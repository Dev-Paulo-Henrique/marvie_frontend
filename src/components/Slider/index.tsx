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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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

export const ProductSlider = () => {
  // Configurações do slider
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
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

  // Lista de imagens
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
      {/* <div className="d-flex justify-content-center mb-3">
        {images.map((img, index) => (
          <a
            key={index}
            data-fslightbox="mygallery"
            className="border mx-1 rounded-2"
            target="_blank"
            href={`https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/${img}`}
            rel="noopener noreferrer"
          >
            <img
              width="60"
              height="60"
              className="rounded-2 img-fluid"
              src={`https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/${img}`}
              alt={`Thumbnail ${index + 1}`}
            />
          </a>
        ))}
      </div> */}
    </aside>
  );
};
