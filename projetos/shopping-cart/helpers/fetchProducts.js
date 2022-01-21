const fetchProducts = (endpoint) => {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${endpoint}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

export default fetchProducts;
