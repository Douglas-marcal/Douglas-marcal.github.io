const saveCartItems = (valueLocalStorage) => (
  localStorage.setItem('cartItems', valueLocalStorage)
);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
