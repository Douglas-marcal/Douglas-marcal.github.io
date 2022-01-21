const getSavedCartItems = (keyLocalStorage) => (
  localStorage.getItem(keyLocalStorage)
);

export default getSavedCartItems;
