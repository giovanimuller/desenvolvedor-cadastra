// filepath: c:\Users\Giovani\Desktop\WORK\CADASTRA\desenvolvedor-cadastra\src\utils\cartHelpers.ts
import { Product } from '../ts/Product';

/**
 * Add a product to the cart and store it in localStorage.
 * In a real app, this would be different, but for this example
 * we're using localStorage for simplicity.
 */
export const addToCart = (product: Product): void => {
  try {
    const cartItems = getCartItems();
    // Always add the product without checking for duplicates
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to add item to cart:", error);
  }
};

/**
 * Remove a product from the cart.
 */
export const removeFromCart = (productId: string): void => {
  try {
    const cartItems = getCartItems();
    const updatedItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
  }
};

/**
 * Get all items from the cart.
 */
export const getCartItems = (): Product[] => {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Failed to get cart items:", error);
    return [];
  }
};

/**
 * Clear the entire cart.
 */
export const clearCart = (): void => {
  try {
    localStorage.removeItem('cart');
  } catch (error) {
    console.error("Failed to clear cart:", error);
  }
};

/**
 * Check if a product is already in the cart.
 */
export const isInCart = (productId: string): boolean => {
  const cartItems = getCartItems();
  return cartItems.some(item => item.id === productId);
};
