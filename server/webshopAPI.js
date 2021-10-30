import express from "express";
import cors from "cors"
import {webshopRouter} from "./ShopAPI/webshop.router.js";

const app = express();
const PORT = 4000;

app.use(cors());

app.use(webshopRouter)


app.get("/", (req, res) => res.send("Welcome to the FoodShop API! :)"));


// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
