"use client";
import { ProductWithTotalPrice } from "@/helpers/products";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: CartProduct) => {
    const productIsAlreadyInCart = products.some(
      (item) => item.id === product.id,
    );

    if (productIsAlreadyInCart) {
      setProducts((prev) =>
        prev.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }

          return item;
        }),
      );

      return;
    }

    setProducts((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
