import React, {useState, useEffect} from "react";
import Product from "./Product";

type ProdProps = {
    id: string,
    img: string,
    name: string,
    price: string,
    category: string,
    description: string,
  }

  type CatProps = {
    category: string
  }  
  
export function ProductsByCategory({category} : CatProps) {

    const [products, setProducts] = useState<ProdProps[]>([])

    const getProducts = async () => {
        let r = await fetch(`http://localhost:4000/products/${category}`)
        let products = await r.json()
        setProducts(products)
    }
    
    useEffect(() => {getProducts()})
    
    const productComponents = products.map(item => 
        <Product id={item.id} imgUrl={item.img} title={item.name} price={item.price} description={item.description} category={item.category} />)

  return (
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
  );
}

export default ProductsByCategory;
