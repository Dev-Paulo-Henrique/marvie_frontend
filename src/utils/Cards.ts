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
  oldPrice?: number;
  tag?: string;
  discount?: number;
  reviews?: number[];
  description?: string;
  sizes?: string[];
  colors?: string[];
  id: number;
  estoque?: number;
}

export const products: CardProps[] = [
  {
    firstImage: Img1,
    secondImage: Img2,
    price: 65.99,
    name: "Women's Blouse Top",
    reviews: [5, 4, 3, 4, 5],
    description: "Esta blusa feminina é ideal para os dias quentes de verão. Feita com um tecido leve e respirável, oferece conforto durante todo o dia. Seu design moderno e elegante permite combinar facilmente com diferentes peças do seu guarda-roupa.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Azul", "Rosa", "Preto"],
    id: 1234567,
    estoque: 10
  },
  {
    firstImage: Img3,
    secondImage: Img4,
    tag: "Novidade",
    price: 85.99,
    name: "Men's Jacket",
    reviews: [3, 2, 4, 1],
    description: "A nova jaqueta masculina traz um visual sofisticado e resistente, perfeita para enfrentar o frio do inverno. Confeccionada com materiais de alta qualidade, oferece um ajuste confortável e um estilo que combina com diversas ocasiões.",
    sizes: ["M", "G", "GG"],
    colors: ["Preto", "Cinza"],
    id: 2345678,
    estoque: 10
  },
  {
    firstImage: Img5,
    secondImage: Img6,
    price: 78.99,
    name: "Men's Jacket",
    reviews: [5, 5, 5, 5, 4, 4],
    description: "Jaqueta masculina casual que combina estilo e conforto. Ideal para o uso diário, possui um corte moderno e é feita com tecido durável. Perfeita para adicionar um toque despojado ao seu visual sem comprometer a elegância.",
    sizes: ["P", "M", "G"],
    colors: ["Azul", "Preto"],
    id: 3456789,
    estoque: 10
  },
  {
    firstImage: Img7,
    secondImage: Img8,
    price: 52.49,
    oldPrice: 74.99,
    name: "Women's T-Shirt",
    discount: 30,
    reviews: [2, 2, 3, 3, 2, 4, 4],
    description: "Camiseta feminina essencial para o seu guarda-roupa. Feita com um tecido de alta qualidade, oferece um ajuste confortável e uma durabilidade excepcional. Seu design básico é perfeito para qualquer ocasião, desde um dia casual até um encontro informal.",
    sizes: ["P", "M", "G"],
    colors: ["Branco", "Cinza"],
    id: 4567890,
    estoque: 10
  },
  {
    firstImage: Img9,
    secondImage: Img10,
    price: 119.99,
    oldPrice: 149.99,
    name: "Men's Jacket Black",
    discount: 20,
    reviews: [1, 1, 1, 1, 2, 2, 3],
    description: "Jaqueta masculina preta, ideal para os meses mais frios. Com um design elegante e uma construção robusta, garante conforto e proteção contra o frio. O ajuste moderno e a cor versátil permitem que ela seja combinada com várias peças do seu guarda-roupa.",
    sizes: ["M", "G", "GG"],
    colors: ["Preto"],
    id: 5678901,
    estoque: 10
  },
  {
    firstImage: Img11,
    secondImage: Img12,
    price: 78.99,
    name: "Men's Jacket Jeans",
    reviews: [5, 4, 5, 5],
    description: "Jaqueta masculina em jeans, uma peça essencial para um visual casual e estiloso. Feita com denim de alta qualidade, proporciona durabilidade e um ajuste confortável. Ideal para diversas ocasiões, desde um passeio descontraído até um evento casual.",
    sizes: ["P", "M", "G"],
    colors: ["Azul"],
    id: 6789012,
    estoque: 10
  },
  {
    firstImage: Img13,
    secondImage: Img14,
    tag: "Promoção",
    price: 85.99,
    name: "Women's Blouse Top",
    reviews: [3, 4, 4, 4, 5, 5, 5, 5, 4],
    description: "Blusa feminina que combina um design moderno com tecido leve, perfeita para os dias quentes. Seu corte versátil e as cores disponíveis permitem criar looks variados e elegantes. Ideal para quem busca conforto e estilo durante o verão.",
    sizes: ["P", "M", "G"],
    colors: ["Rosa", "Branco"],
    id: 7890123,
    estoque: 10
  },
  {
    firstImage: Img15,
    secondImage: Img16,
    price: 65.99,
    name: "Men's Jacket",
    reviews: [1, 2, 1, 2, 1, 2, 1, 1, 2, 2],
    description: "Jaqueta masculina básica, ideal para o uso diário com um toque casual. Feita com um tecido resistente e com um corte que oferece liberdade de movimento. Uma escolha prática para quem precisa de uma peça versátil para diferentes ocasiões.",
    sizes: ["M", "G"],
    colors: ["Cinza", "Preto"],
    id: 8901234,
    estoque: 10
  },
  {
    firstImage: Img17,
    secondImage: Img18,
    price: 49.99,
    name: "Men's Jacket",
    tag: "Últimas unidades",
    reviews: [4, 4, 5, 4, 3, 4, 5, 5, 4, 3, 4, 5],
    description: "Jaqueta masculina em oferta com um design prático e confortável. Ideal para quem procura uma peça estilosa a um preço acessível. Disponível em quantidades limitadas, é a oportunidade perfeita para garantir um item de moda com um excelente custo-benefício.",
    sizes: ["P", "M"],
    colors: ["Marrom"],
    id: 9012345,
    estoque: 10
  },
  {
    firstImage: Img19,
    secondImage: Img20,
    price: 78.99,
    name: "Women's T-shirt",
    reviews: [3, 2, 4, 3, 2, 1, 5, 3, 4, 2, 3],
    description: "Camiseta feminina que une conforto e estilo em uma única peça. Feita com tecido suave e respirável, é perfeita para o uso diário. Seu design simples e elegante torna-a fácil de combinar com outras peças do guarda-roupa, garantindo um visual casual e sofisticado.",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Branco"],
    id: 1023456,
    estoque: 10
  },
  {
    firstImage: Img21,
    secondImage: Img22,
    price: 85.99,
    name: "Men's Blazer",
    reviews: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    description: "Blazer masculino sofisticado, ideal para eventos formais e ocasiões especiais. Confeccionado com materiais de alta qualidade, proporciona um ajuste elegante e confortável. Disponível em azul marinho, é a escolha perfeita para quem deseja um visual clássico e refinado.",
    sizes: ["M", "G", "GG"],
    colors: ["Azul Marinho"],
    id: 2134567,
    estoque: 10
  },
  {
    firstImage: Img23,
    secondImage: Img24,
    price: 72.24,
    name: "Women's Cotton Top",
    oldPrice: 84.99,
    discount: 15,
    reviews: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2],
    description: "Top feminino em algodão, projetado para oferecer conforto e estilo no dia a dia. Seu tecido macio e respirável garante um ajuste agradável, enquanto o design versátil permite diversas combinações. Aproveite o desconto e adicione este item essencial ao seu guarda-roupa.",
    sizes: ["P", "M"],
    colors: ["Bege", "Cinza"],
    id: 3245678,
    estoque: 10
  },
];
