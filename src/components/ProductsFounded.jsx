import React from "react";
import { useLocation } from "react-router-dom";

const ProductsFounded = () => {  
  const location = useLocation(); //desestructuro el state
  const products=location.state.data;

  console.log("Coincidencias: ", products);   

  const list = products.map(item => {
    return (      
        <li key={item._id}>
          <p>{item._id}</p>
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <p>{item.stock}</p>
        </li>
    );
  });

  return (
    <>
      <p>Results:</p>
      <ul>{list}</ul>
    </>
  );
}

export default ProductsFounded;
