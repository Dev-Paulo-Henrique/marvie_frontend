import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Banner } from "../components/Banner";
import { Card } from "../components/Card";

import Img1 from "./../assets/product/img-1.jpg";
import Img2 from "./../assets/product/img-2.jpg";

import Img3 from "./../assets/product/img-3.jpg";
import Img4 from "./../assets/product/img-4.jpg";

import Img5 from "./../assets/product/img-5.jpg";
import Img6 from "./../assets/product/img-6.jpg";

import Img7 from "./../assets/product/img-7.jpg";
import Img8 from "./../assets/product/img-8.jpg";

export function Main() {
  return (
    <>
      <Header />
      <Banner />
      <div className="container mt-3">
        <h1 className="text-secondary">Tendências</h1>
        <div className="row">
          <Card
            firstImage={Img1}
            secondImage={Img2}
            price="R$ 65,99"
            name="Women's Blouse Top"
            reviews={1}
          />
          <Card
            firstImage={Img3}
            secondImage={Img4}
            tag="hot"
            price="R$ 85,99"
            name="Men's Jacket"
            reviews={3}
          />
          <Card
            firstImage={Img5}
            secondImage={Img6}
            price="R$ 78,99"
            name="Men's jacket"
            reviews={5}
          />
          <Card
            firstImage={Img7}
            secondImage={Img8}
            price="R$ 49,99"
            oldPrice="R$ 74,99"
            name="Women's T-Shirt"
            discount="-30%"
            reviews={9}
          />
          <Card
            firstImage={Img7}
            secondImage={Img8}
            price="R$ 49,99"
            oldPrice="R$ 74,99"
            name="Women's T-Shirt"
            discount="-30%"
            reviews={9}
          />
          <Card
            firstImage={Img5}
            secondImage={Img6}
            price="R$ 78,99"
            name="Men's jacket"
            reviews={5}
          />
          <Card
            firstImage={Img3}
            secondImage={Img4}
            tag="hot"
            price="R$ 85,99"
            name="Men's Jacket"
            reviews={3}
          />
          <Card
            firstImage={Img1}
            secondImage={Img2}
            price="R$ 65,99"
            name="Women's Blouse Top"
            reviews={1}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
