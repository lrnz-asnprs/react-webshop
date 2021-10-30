import React from "react";
import { Link } from "react-router-dom";
import './basketcss.css'


interface ProdProps {
  id: string,
  imgUrl: string,
  title: string,
  price: string,
  onRemove: (no: string) => void
}


const BasketProduct: React.FC<ProdProps> = (props) => {

  return (
  
    <tr>
          <td><img className="cart-img" src={props.imgUrl} alt="" /> </td>
          <td className="cart-product-title">
            {props.title} <br/>
            <Link to={`/product/${props.id}`} className="details-link">More details</Link>
          </td>
          <td className="text-center"> 1 </td>
          <td className="text-right">{props.price}.00 kr</td>
          <td className="text-right"><button onClick= {() => props.onRemove(props.id)} className="btn btn-sm btn-danger" ><i className="fa fa-trash" /> </button> </td> 

      </tr>
  );
}

export default BasketProduct;



