import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';
import { Product } from '../ts/Product';
import * as cartHelpers from '../utils/cartHelpers';

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Reset cart when the page is reloaded
  useEffect(() => {
    cartHelpers.clearCart();
    setCartItems([]);
  }, []);

  const addToCart = (product: Product) => {
    // Always add the product without checking for duplicates
    cartHelpers.addToCart(product);
    setCartItems(cartHelpers.getCartItems());
  };

  const removeFromCart = (productId: string) => {
    cartHelpers.removeFromCart(productId);
    setCartItems(cartHelpers.getCartItems());
  };

  const clearCart = () => {
    cartHelpers.clearCart();
    setCartItems([]);
  };
  const isInCart = (productId: string) => {
    return false; // Always return false to allow adding multiple times
  };

  const contextValue = useMemo(() => ({
    cartItems, 
    addToCart, 
    removeFromCart, 
    clearCart,
    itemCount: cartItems.length,
    isInCart
  }), [cartItems]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
