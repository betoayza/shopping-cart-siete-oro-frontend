import React from 'react';
import axios from 'axios';

const DeleteProduct = () => {

    const handleSumbit = async (e) => {
        e.preventDefault();
        const url = '/admin/delete-product';


        
        axios.post(url, e.target.value)
            .then( res => {
                 console.log("Baja exitosa! :) ");
            })
            .catch( error => {
                console.error('El error es: ', error);
            });
    }; 


    return(
        <>
            <h1>De de baja un producto por ID:</h1>
            <form method="POST">
                <label for="id">ID: </label>
                <input id="id" name="id"/>
                <input onClick= { handleSumbit } type="submit" value="Baja!"/>
            </form>
        </>
    );

};

export default DeleteProduct;