import * as webshopModel from "./webshop.model.js";

export async function getAllProducts(req, res) {
  try {
    let allProducts = await webshopModel.getProducts();
    res.json(allProducts);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getProductsByCategory(req, res) {
  try {
    var category = req.params.category;
    let products = await webshopModel.getAllProductsByCategory(category);
    res.json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getProdCategories(req, res) {
  try {
    let categories = await webshopModel.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getBasket(req, res) {
  try {
    let basket = await webshopModel.getBasketObject();
    res.json(basket);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getBasketByUserId(req, res) {
  try {
    var userid = parseInt(req.params.userid);
    let userBasket = await webshopModel.getUserBasket(userid);
    res.json(userBasket);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function putProductInBasket(req, res) {
  try {
    var userid = parseInt(req.params.userid);
    var productid = parseInt(req.params.productid);
    await webshopModel.putProductInBasket(userid, productid);
    res.end();
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function addNewBasket(req, res) {
  try {
    var userid = parseInt(req.params.userid);
    await webshopModel.addBasket(userid);
    res.end();
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteBasket(req, res) {
  try {
    var userid = parseInt(req.params.userid);
    await webshopModel.removeBasket(userid);
    res.end();
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteProductInBasket(req, res) {
  try {
    var userid = parseInt(req.params.userid);
    var productid = parseInt(req.params.productid);
    await webshopModel.deleteProductInBasket(userid, productid);
    res.end();
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getProductById(req, res) {
  try {
    var productid = parseInt(req.params.productid);
    let product = await webshopModel.getById(productid);
    res.json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getProductsByPrice(req, res) {
  try {
    var price = req.params.pricecategory;
    let products = await webshopModel.getAllProductsByPriceCategory(price);
    res.json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
