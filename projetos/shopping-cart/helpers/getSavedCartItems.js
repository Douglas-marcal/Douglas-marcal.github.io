const getSavedCartItems = (keyLocalStorage) => (
  localStorage.getItem(keyLocalStorage)
);

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
