# Project description

For this university project I have created an e-commerce website that sells groceries online. The webpage contains a login page that can save the login information. 
A front page that displays the product selection and it also allows the user to filter the products
according to different categories. It is also possible to get more information about a certain
product by pressing the more detail button. Additionally, the front page displays discounted
products using a carousel. The last page is a shopping basket page, that allows the user
to view a list of products that have been added to the basket. Users can naturally also remove an item from the basket.

## Architectural overview

The project contains a server-side application based on Node.js and Express to enable
JavaScript API and HTTP call functionality in my application. Node.js creates a web
server that listens for any kind of defined HTTP request. The Express web framework
enables the functionality to handle specifically defined HTTP requests including GET, POST, PUT, DELETE methods which in my application communicates with a static JSON file with listed product and basket information.

The client-side application is React based and implemented with TypeScript.

## Running the application

* Start the server-side application within the 'server' directory.
```
node webshopAPI.js
```
* Start the client-side application within the 'client' directory.
```
npm start
```
