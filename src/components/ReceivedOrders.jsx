import React from "react";
import axios from "axios";

const ReceivedOrders = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
      const getOrders = async (e) => {    
        const uri = "/admin/search/product-by-id";
        await axios
          .get(uri)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              console.log("Pedidos encontrados! :) ");
              setOrders(res.data);
            } else {
              alert("No hay pedidos :(");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
      getOrders();
  }, []);  

  return (
    <>
      <h1>Lista pedidos recibidas:</h1>
      {orders && <OrderTable orders={orders} />}
    </>
  );
};

export default ReceivedOrders;
