import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/NavigationBar';
import Home from './components/Home/Home';
import { LoginForm } from './components/Login/Login';
import Modal from './components/Products/ProductDetail';
import Basket from './components/Basket/Basket';
import ProductsByCategory from './components/Products/ProductsByCategory';
import ProductsByPrice from './components/Products/ProductsByPrice';
import {SharedUserStateProvider} from './components/Context/UserContext'


function App() {

  return (
    <div className="App">
      <SharedUserStateProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>

          <Route path="/product/:id" exact component={Modal} />
          <Route path="/products/food" exact component={() =>
              <ProductsByCategory category="food"/>
            } />
          <Route path="/products/drinks" exact component={() =>
              <ProductsByCategory category="drinks"/>
            } />
          <Route path="/products/expensive" exact component={() =>
              <ProductsByPrice price="expensive"/>
            } />
          <Route path="/products/cheap" exact component={() =>
              <ProductsByPrice price="cheap"/>
              } />
         
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={LoginForm} />
          <Route path="/basket" exact component={Basket} />


        </Switch>
      </BrowserRouter>
      </SharedUserStateProvider>
    </div>
  );
}

export default App;
