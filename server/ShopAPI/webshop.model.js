import * as fs from "fs/promises";
const FILE = "./ShopAPI/productsAndBasket.json";

// Return the whole productsAndBasket.json file as an object
async function getFile() {
  try {
    let txt = await fs.readFile(FILE);
    let jstxt = JSON.parse(txt);
    return jstxt;
  } catch (err) {
    if (err.code === "ENOENT") {
      await save([]);
      return [];
    } else throw err;
  }
}

// Return all products offered by our shop
export async function getProducts() {
  try {
    let productsTxt = await fs.readFile(FILE);
    let products = JSON.parse(productsTxt);
    let productsArray = products.products;
    return productsArray;
  } catch (err) {
    if (err.code === "ENOENT") {
      await save([]);
      return [];
    } else throw err;
  }
}

// Return all product categories
export async function getAllCategories() {
  try {
    let file = await fs.readFile(FILE);
    let all = JSON.parse(file);
    let categories = all.categories;
    return categories;
  } catch (err) {
    if (err.code === "ENOENT") {
      await save([]);
      return [];
    } else throw err;
  }
}

//Check if a searched product category exists
async function checkCategory(category) {
  let categories = await getAllCategories();
  let exists = false;

  for (let i = 0; i < categories.length; i++) {
    if (categories[i].localeCompare(category) === 0) {
      exists = true;
    }
  }
  return exists;
}

//Return all offereder products within a specified category
export async function getAllProductsByCategory(category) {
  let productsArray = await getProducts();
  const resultArray = new Array();
  var arrayLength = productsArray.length;
  let exists = await checkCategory(category);

  if (exists === false) {
    throw new Error(`${category} is not a category in our shop`);
  }

  for (var i = 0; i < arrayLength; i++) {
    if (productsArray[i].category === category) {
      resultArray.push(productsArray[i]);
    }
  }
  return resultArray;
}

export async function getBasketObject() {
  try {
    let fileTxt = await fs.readFile(FILE);
    let fileInput = JSON.parse(fileTxt);
    let basketArray = fileInput.basket;
    return basketArray;
  } catch (err) {
    if (err.code === "ENOENT") {
      await save([]);
      return [];
    } else throw err;
  }
}

//Return the basket for a user with specifies userid
export async function getUserBasket(userid) {
  let basketArray = await getBasketObject();
  const resultArray = new Array();
  var arrayLength = basketArray.length;

  if (findUser(basketArray, userid) === -1) {
    throw new Error(`User ${userid} does not have a basket just yet.`);
  }

  for (var i = 0; i < arrayLength; i++) {
    if (basketArray[i].userid === userid) {
      for (var j = 0; j < basketArray[i].products.length; j++) {
        resultArray.push(basketArray[i].products[j]);
      }
    }
  }
  return resultArray;
}

//Write back to the json file
async function save(basket = []) {
  let basketsTxt = JSON.stringify(basket);
  await fs.writeFile(FILE, basketsTxt);
}

//Check if a requested product is in our product list and return a boolean
async function checkIfProductOffered(productid) {
  let allProducts = await getProducts();
  let exists = false;

  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].id === productid) {
      exists = true;
    }
  }
  return exists;
}

//Checks if a product with productid is in basket of user with userid
async function checkIfProductInBasket(userid, productid) {
  let basket = await getUserBasket(userid);
  let isInBasket = false;

  for (let i = 0; i < basket.length; i++) {
    if (basket[i] === productid) {
      isInBasket = true;
    }
  }
  return isInBasket;
}

//Find a given customer in the basket
function findUser(basketArray, id) {
  let index = -1;

  for (var i = 0; i < basketArray.length; i++) {
    if (basketArray[i].userid === id) {
      index = i;
    }
  }
  return index;
}

//Put product to the basket with userid. It reports error if either userid
//does not yet have a basket or if productid is not offered by our shop.
export async function putProductInBasket(userid, productid) {
  let wholeData = await getFile();
  let basketArray = wholeData.basket;
  let userIndex = findUser(basketArray, userid);
  let exists = await checkIfProductOffered(productid);

  if (userIndex === -1) {
    throw new Error(`Basket for user with ID ${userid} doesn't exist`);
  }
  if (exists === false) {
    throw new Error(`Product with ID ${productid} does not exist in our shop`);
  }
  if (exists === true) {
    wholeData.basket[userIndex].products.push(productid);
  }
  await save(wholeData);
}

//Delete one product from the basket with userid. It reports error if either userid
//does not yet have a basket, or if productid is not offered by our shop, or if basket
//does not include the product that should be deleted.
export async function deleteProductInBasket(userid, productid) {
  let wholeData = await getFile();
  let basketArray = wholeData.basket;
  let userIndex = findUser(basketArray, userid);
  let exists = await checkIfProductOffered(productid);
  let checkIfInBasket = await checkIfProductInBasket(userid, productid);

  if (userIndex === -1) {
    throw new Error(`Basket for user with ID ${userid} doesn't exist`);
  }
  if (exists === false) {
    throw new Error(`Product with ID ${productid} does not exist in our shop`);
  }
  if (checkIfInBasket === false) {
    throw new Error(`Product with ID ${productid} is not in the basket`);
  }
  if (exists === true) {
    const index = wholeData.basket[userIndex].products.indexOf(productid);
    wholeData.basket[userIndex].products.splice(index, 1);
  }
  await save(wholeData);
}

//Get product by a specific ID. It returns one product object.
export async function getById(productid) {
  let productArray = await getProducts();
  const resultArray = new Array();
  var arrayLength = productArray.length;
  let exists = await checkIfProductOffered(productid);

  if (exists === false) {
    throw new Error(`Product with ID ${productid} does not exist in our shop`);
  }

  for (var i = 0; i < arrayLength; i++) {
    if (productArray[i].id === productid) {
      resultArray.push(productArray[i]);
    }
  }
  return resultArray[0];
}

// Create a new basket for a new customer
export async function addBasket(userid) {
  let wholeData = await getFile();
  let basketArray = wholeData.basket;
  if (findUser(basketArray, userid) !== -1) {
    throw new Error(`Basket with for user ${userid} already exists`);
  }
  basketArray.push({
    userid: userid,
    products: [],
  });
  await save(wholeData);
}

// Delete one basket for a specific user
export async function removeBasket(userid) {
  let wholeData = await getFile();
  let basketArray = wholeData.basket;
  let userbasket = findUser(basketArray, userid);
  if (userbasket === -1) {
    throw new Error(`Basket for user ${userid} does not exist`);
  }
  basketArray.splice(userbasket, 1);
  await save(wholeData);
}


//Return all offereder products within a specified category
export async function getAllProductsByPriceCategory(price) {
  let productsArray = await getProducts();
  const resultArray = new Array();
  var arrayLength = productsArray.length;
  let priceCategories = ['expensive', 'cheap'];

  if (priceCategories.indexOf(price) == -1) {
    throw new Error(`${price} is not a price category in our shop`);
  }

  if (price == 'expensive') {
    for (var i = 0; i < arrayLength; i++) {
      if (productsArray[i].price > 80) {
        resultArray.push(productsArray[i]);
      }
    }
    return resultArray;

  } else if (price == 'cheap') {
    for (var i = 0; i < arrayLength; i++) {
      if (productsArray[i].price < 80) {
        resultArray.push(productsArray[i]);
      }
    }
    return resultArray;
  }
 
}