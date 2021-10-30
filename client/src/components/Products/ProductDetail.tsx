import React, {useState, useEffect} from 'react'
import './ProductDetail.css'
import { Button} from "react-bootstrap"
import { useHistory, useParams } from "react-router-dom"
import {useSharedUserState} from '../Context/UserContext'

type ProductProps = {
  id: string,
  img: string,
  name: string,
  price: string,
  description: string,
  category: string
}

type ProductID = {
  id: string
}

function Modal()  {

  const prodObject = useParams<ProductID>()
  const prodID = prodObject.id 
  const [user, setUser] = useSharedUserState();
  const [product, setProduct] = useState<ProductProps>({ id: "", img: "", name: "", price: "", description: "", category: ""})

    const getProduct = async () => {
        let r = await fetch(`http://localhost:4000/product/${prodID}`)
        let prod = await r.json()
        setProduct(prod)
    } 
  useEffect(() => {getProduct()})
  
  const history = useHistory()
  
  //addToBasket is the same function as in Product.tsx
  const addToBasket = async () => {
    if (user.id.length !== 0) {
      fetch(`http://localhost:4000/basket/${user.id}/product/${prodID}`, {method: 'PUT'})
      alert(`${product.name} has been added to basket`)
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
      //updates id of user in context to create basket
      setUser((prev) => ({ ...prev, ...{id: lastUserID}}));

      await fetch(`http://localhost:4000/basket/${lastUserID}`, { method: 'POST' });
      fetch(`http://localhost:4000/basket/${lastUserID}/product/${prodID}`, {method: 'PUT'})
      alert(`${product.name} has been added to basket`)
      
    }
  } 

  return(
    <div className="productBox">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
      <div className="details" >
        <div className="big-img">
          <img src={product.img} alt=""/>
        </div>
            <div className="box">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <h4>{product.price} kr.</h4>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent:"center",
                paddingTop: "25px",
              }}
              >
                <button onClick={addToBasket} className="btn btn-primary" style={{marginRight: "10px", marginLeft: "-30px"}}>Add to basket</button>
                <Button className="btn-secondary" onClick={() => history.goBack()}>Go back</Button>
              </div>
            </div>
      </div>
    </div>
  )

}

export default Modal;
