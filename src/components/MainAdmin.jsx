import React from "react";
import {
  AllOrders,
  ReceivedOrders,
  OrdersByUserID,
  AddProduct,
  DeleteProduct,
  ModifyProduct,
  AllProducts,
  ProductByID,
} from "./indexComponents";

const MainAdmin = () => {
  return (
    <>
      <h1>Elija una opción:</h1>
      <div>
        <ul>
          <li>
            Ver Pedidos
            <ul>
              <li>
                <a href onClick={<AllOrders />}>
                  Todos
                </a>
              </li>
              <li>
                <a href onClick={<ReceivedOrders />}>
                  Entregados
                </a>
              </li>
              <li>
                <a href onClick={<OrdersByUserID />}>
                  Por ID cliente
                </a>
              </li>
            </ul>
          </li>
          <li>
            Manejar productos
            <ul>
              <li>
                <a href onClick={<AddProduct />}>
                  Alta
                </a>
              </li>
              <li>
                <a href onClick={<DeleteProduct />}>
                  Baja
                </a>
              </li>
              <li>
                <a href onClick={<ModifyProduct />}>
                  Modificar
                </a>
              </li>
              <li>
                Consulta
                <ul>
                  <li>
                    <a href onClick={<AllProducts />}>
                      Todos
                    </a>
                  </li>
                  <li>
                    <a href onClick={<ProductByID />}>
                      Por ID
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MainAdmin;
