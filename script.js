const inputSearch = document.getElementById('input_search');
const btnSearch = document.getElementById('btnSearch');
const selectCategory = document.getElementById('select_category');
const productContent = document.getElementById('products_content');



// const baseURL = 'http://localhost:4001/api/v1';
const baseURL = 'https://bsalebackapi.herokuapp.com/api/v1';


const getCategories = async () => {
  const res = await fetch(`${baseURL}/categories`);
  const data = await res.json();
  return data;
};

const getProducts = async (params = {}) => {
  const url = new URL(`${baseURL}/products`);
  //   const params = params;
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const renderProducts = (products) => {
  // actualizar la vista
  productContent.classList.add('cards-grid');
  productContent.textContent = '';

  products.rows.forEach((item) => {
    const cardContent = document.createElement('div');
    const img = document.createElement('img');
    const cardContentDescription = document.createElement('div');
    const productTitle = document.createElement('h4');
    const price = document.createElement('h5');

    cardContent.classList.add('card-item');
    img.classList.add('image-item');
    cardContentDescription.classList.add('content-item-description');
    productTitle.classList.add('title-item');
    price.classList.add('price-item');

    img.src = item.url_image;
    productTitle.textContent = item.name;
    price.textContent = `$ ${item.price}`;

    cardContentDescription.appendChild(productTitle);
    cardContentDescription.appendChild(price);

    cardContent.appendChild(img);
    cardContent.appendChild(cardContentDescription);

    productContent.appendChild(cardContent);
  });
};

const renderCategories = async () => {
  const data = await getCategories();
  const categories = data.rows;

  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;

    selectCategory.appendChild(option);
  });
};

const getProductsBySearch = async (word) => {
  // get data
  const products = await getProducts({ search: word });
  renderProducts(products);
};

const getProductsByCategory = async (categoryId) => {
  // traer los productos por categoria
  const products = await getProducts({ category: categoryId });
  renderProducts(products);
};

btnSearch.addEventListener('click', (e) => {
  let word = 'a';
  word = inputSearch.value;
  e.preventDefault();
  getProductsBySearch(word);
});

selectCategory.addEventListener('change', () => {
  inputSearch.value = '';
  const categoryId = selectCategory.options[selectCategory.selectedIndex].value;
  getProductsByCategory(categoryId);
  //   window.location.href = 'https://nba.com'
});

renderCategories();
