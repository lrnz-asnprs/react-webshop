import React, {useState, useEffect} from 'react';
import Product from '../Products/Product'
import {Message} from "./WelcomeMessage"
import CarouselBlock from "./Carousel"
import {useSharedUserState} from '../Context/UserContext'

type ProdProps = {
    id: string,
    img: string,
    name: string,
    price: string,
    category: string,
    description: string,
  }

const Home: React.FunctionComponent<ProdProps> = () => {

    //Context for user
    const [user] = useSharedUserState();

    //State products
    const [products, setProducts] = useState<ProdProps[]>([])

    const getProducts = async () => {
        let r = await fetch('http://localhost:4000/products/')
        let products = await r.json()
        setProducts(products)
    }
    
    useEffect(() => {getProducts()}, [])
    
    const productComponents = products.map(item => 
        <Product key = {item.id} id={item.id} imgUrl={item.img} title={item.name} price={item.price} description={item.description} category={item.category} />)

    return (
        <div>
            
            <Message name= {user.firstName} logged= {user.loggedin}/>
            
            <CarouselBlock/>
            <div style={{
                 display: "flex",
                 flexDirection: "row",
                 alignItems: "center",
                 justifyContent: "space-around",
                 alignContent: "space-between",
                 textAlign: "center",
                 fontSize: "18pt",
                 flexWrap: "wrap",
            }}>
            {productComponents}
            </div>
        </div>
    );
}

export default Home;