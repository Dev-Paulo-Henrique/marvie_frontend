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
  price: number;
  oldPrice?: string;
  tag?: string;
  discount?: number;
  reviews?: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
  id: string;
}

export const products: CardProps[] = [
  {
    firstImage: Img1,
    secondImage: Img2,
    price: 65.99,
    name: "Women's Blouse Top",
    reviews: 18,
    description: "Esta blusa feminina é ideal para os dias quentes de verão. Feita com um tecido leve e respirável, oferece conforto durante todo o dia. Seu design moderno e elegante permite combinar facilmente com diferentes peças do seu guarda-roupa.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Azul", "Rosa", "Preto"],
    id: "4F9J8K2"
  },
  {
    firstImage: Img3,
    secondImage: Img4,
    tag: "Novidade",
    price: 85.99,
    name: "Men's Jacket",
    reviews: 3,
    description: "A nova jaqueta masculina traz um visual sofisticado e resistente, perfeita para enfrentar o frio do inverno. Confeccionada com materiais de alta qualidade, oferece um ajuste confortável e um estilo que combina com diversas ocasiões.",
    sizes: ["M", "G", "GG"],
    colors: ["Preto", "Cinza"],
    id: "R7L3D6A"
  },
  {
    firstImage: Img5,
    secondImage: Img6,
    price: 78.99,
    name: "Men's Jacket",
    reviews: 35,
    description: "Jaqueta masculina casual que combina estilo e conforto. Ideal para o uso diário, possui um corte moderno e é feita com tecido durável. Perfeita para adicionar um toque despojado ao seu visual sem comprometer a elegância.",
    sizes: ["P", "M", "G"],
    colors: ["Azul", "Preto"],
    id: "Z1T8V5C"
  },
  {
    firstImage: Img7,
    secondImage: Img8,
    price: 52.49,
    oldPrice: "R$ 74,99",
    name: "Women's T-Shirt",
    discount: 30,
    reviews: 59,
    description: "Camiseta feminina essencial para o seu guarda-roupa. Feita com um tecido de alta qualidade, oferece um ajuste confortável e uma durabilidade excepcional. Seu design básico é perfeito para qualquer ocasião, desde um dia casual até um encontro informal.",
    sizes: ["P", "M", "G"],
    colors: ["Branco", "Cinza"],
    id: "H2Q9W4F"
  },
  {
    firstImage: Img9,
    secondImage: Img10,
    price: 119.99,
    oldPrice: "R$ 149,99",
    name: "Men's Jacket Black",
    discount: 20,
    reviews: 129,
    description: "Jaqueta masculina preta, ideal para os meses mais frios. Com um design elegante e uma construção robusta, garante conforto e proteção contra o frio. O ajuste moderno e a cor versátil permitem que ela seja combinada com várias peças do seu guarda-roupa.",
    sizes: ["M", "G", "GG"],
    colors: ["Preto"],
    id: "J3K7M1L"
  },
  {
    firstImage: Img11,
    secondImage: Img12,
    price: 78.99,
    name: "Men's Jacket Jeans",
    reviews: 5,
    description: "Jaqueta masculina em jeans, uma peça essencial para um visual casual e estiloso. Feita com denim de alta qualidade, proporciona durabilidade e um ajuste confortável. Ideal para diversas ocasiões, desde um passeio descontraído até um evento casual.",
    sizes: ["P", "M", "G"],
    colors: ["Azul"],
    id: "B8N6P4R"
  },
  {
    firstImage: Img13,
    secondImage: Img14,
    tag: "Promoção",
    price: 85.99,
    name: "Women's Blouse Top",
    reviews: 63,
    description: "Blusa feminina que combina um design moderno com tecido leve, perfeita para os dias quentes. Seu corte versátil e as cores disponíveis permitem criar looks variados e elegantes. Ideal para quem busca conforto e estilo durante o verão.",
    sizes: ["P", "M", "G"],
    colors: ["Rosa", "Branco"],
    id: "D5S1X9A"
  },
  {
    firstImage: Img15,
    secondImage: Img16,
    price: 65.99,
    name: "Men's Jacket",
    reviews: 1,
    description: "Jaqueta masculina básica, ideal para o uso diário com um toque casual. Feita com um tecido resistente e com um corte que oferece liberdade de movimento. Uma escolha prática para quem precisa de uma peça versátil para diferentes ocasiões.",
    sizes: ["M", "G"],
    colors: ["Cinza", "Preto"],
    id: "M2V3L7Q"
  },
  {
    firstImage: Img17,
    secondImage: Img18,
    price: 49.99,
    name: "Men's Jacket",
    tag: "Últimas unidades",
    reviews: 23,
    description: "Jaqueta masculina em oferta com um design prático e confortável. Ideal para quem procura uma peça estilosa a um preço acessível. Disponível em quantidades limitadas, é a oportunidade perfeita para garantir um item de moda com um excelente custo-benefício.",
    sizes: ["P", "M"],
    colors: ["Marrom"],
    id: "T9W4J1H"
  },
  {
    firstImage: Img19,
    secondImage: Img20,
    price: 78.99,
    name: "Women's T-shirt",
    reviews: 76,
    description: "Camiseta feminina que une conforto e estilo em uma única peça. Feita com tecido suave e respirável, é perfeita para o uso diário. Seu design simples e elegante torna-a fácil de combinar com outras peças do guarda-roupa, garantindo um visual casual e sofisticado.",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Branco"],
    id: "X6R8K2D"
  },
  {
    firstImage: Img21,
    secondImage: Img22,
    price: 85.99,
    name: "Men's Blazer",
    reviews: 12,
    description: "Blazer masculino sofisticado, ideal para eventos formais e ocasiões especiais. Confeccionado com materiais de alta qualidade, proporciona um ajuste elegante e confortável. Disponível em azul marinho, é a escolha perfeita para quem deseja um visual clássico e refinado.",
    sizes: ["M", "G", "GG"],
    colors: ["Azul Marinho"],
    id: "Q4L7M5Z"
  },
  {
    firstImage: Img23,
    secondImage: Img24,
    price: 72.24,
    name: "Women's Cotton Top",
    oldPrice: "R$ 84,99",
    discount: 15,
    reviews: 2,
    description: "Top feminino em algodão, projetado para oferecer conforto e estilo no dia a dia. Seu tecido macio e respirável garante um ajuste agradável, enquanto o design versátil permite diversas combinações. Aproveite o desconto e adicione este item essencial ao seu guarda-roupa.",
    sizes: ["P", "M"],
    colors: ["Bege", "Cinza"],
    id: "F3H2P9B"
  },
];
