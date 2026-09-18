// Shared cart state (localStorage-backed, no server) and city selection.
// Used by index.html, menu.html, and cart.html.

const CART_KEY = 'noon-cart';
const CITY_KEY = 'noon-city';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, name, price, qty = 1) {
  const cart = getCart();
  const existing = cart.find(line => line.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, name, price, qty });
  }
  saveCart(cart);
}

function updateCartQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(line => line.id !== id);
  } else {
    const line = cart.find(l => l.id === id);
    if (line) line.qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(id) {
  saveCart(getCart().filter(line => line.id !== id));
}

function clearCart() {
  saveCart([]);
}

function getCartCount() {
  return getCart().reduce((sum, line) => sum + line.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, line) => sum + line.qty * line.price, 0);
}

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
  });
}

function getCity() {
  return localStorage.getItem(CITY_KEY) || 'abuja';
}

function setCity(city) {
  localStorage.setItem(CITY_KEY, city);
}

function formatNaira(amount) {
  return '\u20A6' + amount.toLocaleString('en-NG');
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
