import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import {useSharedUserState} from '../Context/UserContext'
import './Product.css'

type CardProps = {
    id: string,
    imgUrl: string,
    title: string,
    price: string,
    description: string,
    category: string
  }

function Products({ id, imgUrl, title, price, description, category }: CardProps) {

  const [user, setUser] = useSharedUserState();

  //addToBasket method used onClick when adding to basket
  const addToBasket = async () => {
    if (user.id.length !== 0) {
      fetch(`http://localhost:4000/basket/${user.id}/product/${id}`, {method: 'PUT'})
      alert(`${title} has been added to basket`)
    }
    else {
      let r = await fetch('http://localhost:4000/basket')
      let baskets = await r.json()
    
      var lastUserID = '';
      //gets latest user id from basket and increments it by one
      for (var i = 0; i < baskets.length; i++) {
        var basket = baskets[i];
        lastUserID = basket.userid;
      }
      lastUserID = lastUserID + 1;
      //updates id of user in context to create a new basket
      setUser((prev) => ({ ...prev, ...{id: lastUserID}}));

      await fetch(`http://localhost:4000/basket/${lastUserID}`, { method: 'POST' })
      fetch(`http://localhost:4000/basket/${lastUserID}/product/${id}`, {method: 'PUT'})
      
      alert(`${title} has been added to basket`)

    }
  }  

  return (
    <div className = "productContainer">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>

      <Card style={{ width: "18rem"}}>
        <Link to={`/product/${id}`}>
        <Card.Img src={imgUrl}/>
        </Link>
        <Card.Body>
          <Card.Title >{title}</Card.Title>
          <Card.Subtitle> {price} kr. </Card.Subtitle>
          <div className = "buttons">
          <button onClick={addToBasket} className="btn btn-primary">Add to basket</button>
          <Link to={`/product/${id}`} className="btn btn-secondary">More details</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Products;
