const fetchProducts = (endpoint) => {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${endpoint}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
