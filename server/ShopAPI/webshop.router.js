import express from "express";
import {
  getAllProducts,
  getBasket,
  getBasketByUserId,
  getProductsByCategory,
  putProductInBasket,
  getProductById,
  deleteProductInBasket,
  addNewBasket,
  deleteBasket,
  getProdCategories,
  getProductsByPrice
} from "./webshop.controller.js";

export const webshopRouter = express.Router();

// middleware specific to this route
webshopRouter.use(express.json());

/**
 * Here we define our HTTP calls
 */
webshopRouter.get("/products", getAllProducts);

webshopRouter.get("/products/:category", getProductsByCategory);

webshopRouter.get("/product_categories", getProdCategories);

webshopRouter.get("/productprice/:pricecategory", getProductsByPrice);

webshopRouter.get("/basket", getBasket);

webshopRouter.get("/basket/:userid", getBasketByUserId);

webshopRouter.put("/basket/:userid/product/:productid", putProductInBasket);

webshopRouter.post("/basket/:userid", addNewBasket);

webshopRouter.delete("/basket/:userid", deleteBasket);

webshopRouter.delete("/basket/:userid/product/:productid",deleteProductInBasket);

webshopRouter.get("/product/:productid", getProductById);
