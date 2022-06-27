import axios from 'axios';
import React from 'react'
import { ShoppingCartTableRow } from './ShoppingCartTableRow'

export const ShoppingCartTable = ({ shoppingCart, setShoppingCart }) => {


  const removeItem = async (prodCode) => {
    console.log(prodCode);

    const options={
      url: `/user/profile/shopping-cart/delete/${prodCode}`,
       method: 'delete',
       headers: {'X-Requested-With': 'XMLHttpRequest'},
       data: { prodCode },  
    }

    await axios
      .request(options)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setShoppingCart(res.data);
          alert("Eliminacion exitosa");
        } else {
          alert("No se encontró producto");
        }
      })
      .catch((error) => error);
  };

  const removeAllItems = async (e) => {
    console.log(e.target);

    const options={
      url: `/user/shopping-cart/delete/all`,
       method: 'delete',
       headers: {'X-Requested-With': 'XMLHttpRequest'},
       data: { code: shoppingCart.code },  
    }

    await axios.request(options)
      .then(res=>{
        //if shopping cart exists
        if(res.data){
          console.log(res.data);
          setShoppingCart([]);
          alert("Items borrados!");
        }else{
          alert("Carrito inexistente :(");
        }
      })
      .catch(error=>error);
  };

  return (
    <div className="responsible-table" id="shopping-cart-div">
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Producto</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart &&
              shoppingCart.products.forEeach((product) => {
                <ShoppingCartTableRow key={product._id} product={product} removeItem={removeItem}/>
              })}
          </tbody>
        </table>        
        <button onClick={removeAllItems}>Remove all</button>
      </div>
  )
}
