function addToCart(cart, product, quantity) {
  if (quantity < 1) {
    throw new RangeError("Количество должно быть положительным");
  }

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (newQuantity > product.stock) {
      throw new RangeError("Количество превышает остаток на складе");
    }
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item,
    );
  }

  if (quantity > product.stock) {
    throw new RangeError("Количество превышает остаток на складе");
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) {
  if (quantity < 1) {
    throw new RangeError("Количество должно быть положительным");
  }

  const item = cart.find((entry) => entry.id === productId);
  if (!item) return cart;

  if (quantity > item.stock) {
    throw new RangeError("Количество превышает остаток на складе");
  }

  return cart.map((entry) =>
    entry.id === productId ? { ...entry, quantity } : entry,
  );
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce(
    (subtotal, item) => subtotal + item.price * item.quantity,
    0,
  );
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;
  if (promoCode === "SAVE10" && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }

  let delivery = 30000;
  if (subtotal >= 50000) {
    delivery = 0;
  }

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
