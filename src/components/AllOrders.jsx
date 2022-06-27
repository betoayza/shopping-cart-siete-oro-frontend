import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AllOrders = () => {
        //const [orders, setOrders] = useState([]); // dinamic data 
        const [ordersTable, setOrdersTable] = useState([]); // static data 
        //const [orderSearch, setOrderSearch] = useState(""); // typing control in searching bar 

        const url = "/admin/orders/all";

        const getOrders = async () => {
              await axios.get(url)
                    .then(res => {
                        const orders = res.data;   
                        setOrdersTable(orders);
                    })
                    .catch(error => {
                        console.log('Error al conectar con backend!...');
                    });
    
        }

        //execute function with hook
        useEffect( () => {
                getOrders(); 
        }, []); 
    
        //ver si hace falta usar hook useEffect
        return(
                <>            
                    <p>Lista Ordenes Totales</p>          

                
                    {/*Seaching Bar
                    <div className='containerInput'>
                        <input className='form-control inputBuscar'
                            value={ orderSearch }
                            placeholder="Qué está buscando?..."
                            onChange={ handleChange }
                        />
                        <button className='btn btn-success'>
                            <FontAwesomeIcon icon='{faSearch}' />          
                        </button>
                    </div>
                */ }
                    {/*Table*/}
                    <div className='responsible-table'>
                        <table class="table table-dark">
                            <thead>
                                <tr>                
                                    <th scope="col">ID</th>
                                    <th scope="col">ID usuario</th>
                                    <th scope="col">Incluye</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col">Fecha compra</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ordersTable.map( (order) =>                                     
                                    <tr>
                                        <td>{order._id}</td>
                                        <td>{order.userID}</td>
                                        <td>{order.items}</td>
                                        <td>{order.price}</td>
                                        <td>{order.date}</td>                               
                                    </tr>
                                            )
                                }           
                            </tbody>
                        </table>
                    </div>
                    </>
        );
}

export default AllOrders;