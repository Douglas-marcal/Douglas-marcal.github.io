const fetchItem = (endpoint) => {
  const URL = `https://api.mercadolibre.com/items/${endpoint}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
