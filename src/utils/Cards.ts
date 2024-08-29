import Img1 from "./../assets/product/img-1.jpg";
import Img2 from "./../assets/product/img-2.jpg";

import Img3 from "./../assets/product/img-3.jpg";
import Img4 from "./../assets/product/img-4.jpg";

import Img5 from "./../assets/product/img-5.jpg";
import Img6 from "./../assets/product/img-6.jpg";

import Img7 from "./../assets/product/img-7.jpg";
import Img8 from "./../assets/product/img-8.jpg";

import Img9 from "./../assets/product/img-9.jpg";
import Img10 from "./../assets/product/img-10.jpg";

import Img11 from "./../assets/product/img-11.jpg";
import Img12 from "./../assets/product/img-12.jpg";

import Img13 from "./../assets/product/img-13.jpg";
import Img14 from "./../assets/product/img-14.jpg";

import Img15 from "./../assets/product/img-15.jpg";
import Img16 from "./../assets/product/img-16.jpg";

import Img17 from "./../assets/product/img-17.jpg";
import Img18 from "./../assets/product/img-18.jpg";

import Img19 from "./../assets/product/img-19.jpg";
import Img20 from "./../assets/product/img-20.jpg";

import Img21 from "./../assets/product/img-21.jpg";
import Img22 from "./../assets/product/img-22.jpg";

import Img23 from "./../assets/product/img-23.jpg";
import Img24 from "./../assets/product/img-24.jpg";

export interface CardProps {
  name: string;
  firstImage: string;
  secondImage: string;
  price: string;
  oldPrice?: string;
  tag?: string;
  discount?: number;
  reviews?: number;
}

export const products = [
  {
    firstImage: Img1,
    secondImage: Img2,
    price: "R$ 65,99",
    name: "Women's Blouse Top",
    reviews: 18,
  },
  {
    firstImage: Img3,
    secondImage: Img4,
    tag: "Novidade",
    price: "R$ 85,99",
    name: "Men's Jacket",
    reviews: 3,
  },
  {
    firstImage: Img5,
    secondImage: Img6,
    price: "R$ 78,99",
    name: "Men's jacket",
    reviews: 35,
  },
  {
    firstImage: Img7,
    secondImage: Img8,
    price: "R$ 52,49",
    oldPrice: "R$ 74,99",
    name: "Women's T-Shirt",
    discount: 30,
    reviews: 59,
  },
  {
    firstImage: Img9,
    secondImage: Img10,
    price: "R$ 119,99",
    oldPrice: "R$ 149,99",
    name: "Men's jacket Black",
    discount: 20,
    reviews: 129,
  },
  {
    firstImage: Img11,
    secondImage: Img12,
    price: "R$ 78,99",
    name: "Men's jacket Jeans",
    reviews: 5,
  },
  {
    firstImage: Img13,
    secondImage: Img14,
    tag: "Promoção",
    price: "R$ 85,99",
    name: "Women's Blouse Top",
    reviews: 63,
  },
  {
    firstImage: Img15,
    secondImage: Img16,
    price: "R$ 65,99",
    name: "Men's jacket",
    reviews: 1,
  },
  {
    firstImage: Img17,
    secondImage: Img18,
    price: "R$ 49,99",
    name: "Men's jacket",
    tag: "Últimas unidades",
    reviews: 23,
  },
  {
    firstImage: Img19,
    secondImage: Img20,
    price: "R$ 78,99",
    name: "Women's T-shirt",
    reviews: 76,
  },
  {
    firstImage: Img21,
    secondImage: Img22,
    price: "R$ 85,99",
    name: "Men's Blazer",
    reviews: 12,
  },
  {
    firstImage: Img23,
    secondImage: Img24,
    price: "R$ 72,24",
    name: "Women's Cotton Top",
    oldPrice: "R$ 84,99",
    discount: 15,
    reviews: 2,
  },
];
