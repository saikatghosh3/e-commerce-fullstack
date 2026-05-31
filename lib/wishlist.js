export const WISHLIST_STORAGE_KEY = 'wishlist';
export const WISHLIST_UPDATED_EVENT = 'wishlist:updated';

export function readWishlist() {
  if (typeof window === 'undefined') return [];

  try {
    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
    return Array.isArray(wishlist) ? wishlist : [];
  } catch (error) {
    console.error('Error reading wishlist:', error);
    return [];
  }
}

export function saveWishlist(wishlist) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  window.dispatchEvent(new CustomEvent(WISHLIST_UPDATED_EVENT, { detail: wishlist }));
}

export function isWishlisted(productId, wishlist = readWishlist()) {
  return wishlist.includes(productId);
}

export function toggleWishlist(productId) {
  const wishlist = readWishlist();
  const nextWishlist = wishlist.includes(productId)
    ? wishlist.filter((id) => id !== productId)
    : [...wishlist, productId];

  saveWishlist(nextWishlist);
  return nextWishlist;
}

export function removeFromWishlist(productId) {
  const nextWishlist = readWishlist().filter((id) => id !== productId);
  saveWishlist(nextWishlist);
  return nextWishlist;
}

export function getWishlistCount(wishlist = readWishlist()) {
  return wishlist.length;
}
