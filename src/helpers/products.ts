import { Product } from "@prisma/client";

interface ProductWithTotalPrice extends Product {
  total: number;
}

const computeProductTotalPrice = (product: Product): ProductWithTotalPrice => {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      total: Number(product.basePrice),
    };
  }

  const totalPrice =
    Number(product.basePrice) * (product.discountPercentage / 100);

  return {
    ...product,
    total: totalPrice,
  };
};
