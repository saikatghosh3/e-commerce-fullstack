export const CART_STORAGE_KEY = 'cart';
export const CART_UPDATED_EVENT = 'cart:updated';

export function readCart() {
  if (typeof window === 'undefined') return [];

  try {
    const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    console.error('Error reading cart:', error);
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: cart }));
}

export function addToCart(productId, quantity = 1, stock) {
  const cart = readCart();
  const safeQuantity = Math.max(1, Number(quantity) || 1);
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    const nextQuantity = existingItem.quantity + safeQuantity;
    existingItem.quantity = stock ? Math.min(nextQuantity, stock) : nextQuantity;
  } else {
    cart.push({
      productId,
      quantity: stock ? Math.min(safeQuantity, stock) : safeQuantity,
    });
  }

  saveCart(cart);
  return cart;
}

export function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: [] }));
}

export function getCartCount(cart = readCart()) {
  return cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
}
