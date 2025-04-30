import { Product } from '../ts/Product';


export const addToCart = (product: Product): void => {
  try {
    const cartItems = getCartItems();
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to add item to cart:", error);
  }
};


export const removeFromCart = (productId: string): void => {
  try {
    const cartItems = getCartItems();
    const updatedItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
  }
};


export const getCartItems = (): Product[] => {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Failed to get cart items:", error);
    return [];
  }
};


export const clearCart = (): void => {
  try {
    localStorage.removeItem('cart');
  } catch (error) {
    console.error("Failed to clear cart:", error);
  }
};


export const isInCart = (productId: string): boolean => {
  const cartItems = getCartItems();
  return cartItems.some(item => item.id === productId);
};
