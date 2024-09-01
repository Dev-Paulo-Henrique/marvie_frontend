import { useState, useEffect } from "react";
import { products, CardProps } from "../utils/Cards";

export function useProduct(productId: string | undefined) {
  const [product, setProduct] = useState<CardProps | null>(null);

  useEffect(() => {
    if (productId !== undefined) {
      const foundProduct = products.find(p => p.id === productId);
      setProduct(foundProduct || null);
    }
  }, [productId]);

  return product;
}
