import React, { useState, useEffect } from 'react';
import BasketProduct from './BasketProduct';
import {useSharedUserState} from '../Context/UserContext'
import { Link } from 'react-router-dom';
import { BasketMessage } from './BasketMessage';
import './basketcss.css'

type ProdProps = {
    id: string,
    img: string,
    name: string,
    price: string,
    category: string,
    description: string,
}

const Basket: React.FunctionComponent<ProdProps> = () => {


    const [basketProducts, setBasketproducts] = useState<ProdProps[]>([])
    const [user, setUser] = useSharedUserState();
    
    /**
     * API calls to fetch the products from the basket of a given user
     */
    
    useEffect(() => {
        
        const getAll = async () => {
            try {   
                let r = await fetch(`http://localhost:4000/basket/${user.id}`)
                let ids = await r.json()
                
                let bp: ProdProps[] = []
                for (let id of ids) {
                    let t = await fetch(`http://localhost:4000/product/${id}`)
                    let product = await t.json()
                    
                    bp.push(product);
                }
                setBasketproducts(bp);
            } catch (error) {
                console.log("No products in the basket.")
            }
        }   
            
            getAll()}, [basketProducts, user.id]);
    
    /**
     * Callback function for child components
     */
     function removeBasketProduct(id: string) {
        // DELETE request for specific product id
        fetch(`http://localhost:4000/basket/${user.id}/product/${id}`, { method: 'DELETE' });
    
    }

    /**
     * Create arr of child components
     */
    const basketComponents = basketProducts.map(item =>
        <BasketProduct key={item.id} id={item.id} imgUrl={item.img} title={item.name} price={item.price} onRemove={() => removeBasketProduct(item.id)}/>
        )
    
    /**
     * Calculation of the costs: shipping costs, subtotal and total
     */
    let subTotalPrice = 0
    
    function sumSubtotalPrice(): string{
        for (let product of basketProducts) {
            subTotalPrice += parseInt(product.price)      
        }
    
        return subTotalPrice.toFixed(2)
    }
    
    function sumTotalPrice(): string{
        let shippingCosts = shippingCost();
        let totalPrice = subTotalPrice + parseInt(shippingCosts)
        return totalPrice.toFixed(2)
    }

    function shippingCost():string {
        if (basketProducts.length > 0) {
            return '7.00' 
        } else {
            return '0.00' 
        }
    }

    /**
     * Function to remove the basket when user clicks on checkout
     */
    function deleteBasket(){

        if (basketProducts.length === 0) {
            alert("You have no products in your basket. Add some to check out")
        } else {

            // DELETE the entire basket for a user
            fetch(`http://localhost:4000/basket/${user.id}`, { method: 'DELETE' });
            setUser((prev) => ({ ...prev, ...{id: "", firstName: "", lastName: "", email: "", loggedin: false}}));
    
            alert("Thank you for shopping. See you next time.")
            }
            
        }
        
        return (
            
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <BasketMessage name = {user.firstName} logged={user.loggedin} />
                <div className="container">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"> </th>
                                        <th scope="col">Products</th>
                                        <th scope="col" className="text-center col-xs-3">Quantity</th>
                                        <th scope="col" className="text-right">Price</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {basketComponents}
                                    <tr>
                                        <td />
                                        <td />
                                        <td />
                                        <td>Sub-Total</td>
                                        <td className="text-right">{sumSubtotalPrice()} kr</td>
                                    </tr>
                                    <tr>
                                        <td />
                                        <td />
                                        <td />
                                        <td className="text-subtotal">Shipping</td>
                                        <td className="text-subtotal text-right">{shippingCost()} kr</td>
                                    </tr>
                                    <tr>
                                        <td />
                                        <td />
                                        <td />
                                        <td className="text-total">Total</td>
                                        <td className="text-total text-right">{sumTotalPrice()} kr</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col mb-2">
                        <div className="row">
                            <div className="col-sm-12  col-md-6">
                                <Link to="/" className="btn btn-block btn-secondary"> Continue Shopping </Link>
                            </div>
                            <div className="col-sm-12 col-md-6 text-right">
                                <Link to="/" onClick={deleteBasket} className="btn btn-block btn-primary text-uppercase">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Basket