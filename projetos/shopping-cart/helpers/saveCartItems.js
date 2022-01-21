const saveCartItems = (valueLocalStorage) => (
  localStorage.setItem('cartItems', valueLocalStorage)
);

export default saveCartItems;
