const cartItemsContainer = document.querySelector('.cart__items');
const itemsContainer = document.querySelector('.items');
const buttonSearch = document.querySelector('.button-search');
const inputText = document.querySelector('.input-text');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image, priceFormated }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', priceFormated));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => (
  item.querySelector('span.item__sku').innerText
);

const sumOfTotalPrice = () => {
  const cartItems = Array.from(document.querySelectorAll('.cart__item'));
  const displayTotalPrice = document.querySelector('.total-price');
  const totalPrice = cartItems.reduce((acc, curr) => {
    const arrayStrings = curr.textContent.split(' ');
    const price = arrayStrings[arrayStrings.length - 1].slice(1);
    return acc + +price;
  }, 0);
  displayTotalPrice.textContent = `${totalPrice}`;
};

const onClickRemoveItem = ({ target }) => {
  if (target.className === 'cart__item') {
    target.remove();
    const valueToSaveLocalStorage = cartItemsContainer.innerHTML;
    saveCartItems(valueToSaveLocalStorage);
    sumOfTotalPrice();
  }
};

const cartItemClickListener = () => (
  cartItemsContainer.addEventListener('click', onClickRemoveItem)
);

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | 

NAME: ${name} | 

PRICE: $${salePrice}
`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// insertBefore foi consultado aqui: https://qastack.com.br/programming/4527911/how-to-insert-element-as-a-first-child
const initLoading = () => {
  const container = document.querySelector('.container');
  const customElement = createCustomElement('section', 'loading', 'carregando...');
  container.insertBefore(customElement, container.firstChild);
};

const removeLoading = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
};

const dataFetchProducts = async (item = 'computador') => {
  initLoading();
  const { results } = await fetchProducts(item);
  removeLoading();
  results.forEach(({ id: sku, title: name, thumbnail, price }) => {
    const image = thumbnail.replace('I', 'W');
    const priceFormated = `R$ ${price}`;
    const sectionProduct = createProductItemElement({ sku, name, image, priceFormated });
    itemsContainer.appendChild(sectionProduct);
  });
};

const addCartItems = () => {
  itemsContainer.addEventListener('click', async ({ target }) => {
    if (target.className === 'item__add') {
      const productID = getSkuFromProductItem(target.parentNode);
      const { id: sku, title: name, price: salePrice } = await fetchItem(productID);
      const listItem = createCartItemElement({ sku, name, salePrice });
      cartItemsContainer.appendChild(listItem);
      const valueToSaveLocalStorage = cartItemsContainer.innerHTML;
      saveCartItems(valueToSaveLocalStorage);
      sumOfTotalPrice();
    }
  });
};

const renderProductsLocalStorage = () => {
  cartItemsContainer.innerHTML = getSavedCartItems('cartItems');
  cartItemsContainer.addEventListener('click', onClickRemoveItem);
};

const emptyCart = () => {
  const buttonEmptyCart = document.querySelector('.empty-cart');
  buttonEmptyCart.addEventListener('click', () => {
    cartItemsContainer.innerHTML = '';
    const valueToSaveLocalStorage = cartItemsContainer.innerHTML;
    saveCartItems(valueToSaveLocalStorage);
    sumOfTotalPrice();
  });
};

const searchProducts = () => {
  buttonSearch.addEventListener('click', async () => {
    itemsContainer.innerHTML = '';
    dataFetchProducts(inputText.value);
    inputText.value = '';
  });
};

const searchProductsWithEnter = () => {
  inputText.addEventListener('keydown', ({ key }) => {
    if (key === 'Enter') {
      buttonSearch.click();
    }
  });
};

window.onload = () => {
  searchProducts();
  searchProductsWithEnter();
  dataFetchProducts();
  addCartItems();
  renderProductsLocalStorage();
  emptyCart();
  sumOfTotalPrice();
};
