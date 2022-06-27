import axios from 'axios';
import React from 'react';

const ProductByID = () => {

    const handleSumbit = async (e) => {
        e.preventDefault();
        const url = '/admin/search/product-by-id';
        axios.get(url, e.target.value)
            .then( res => {
                 console.log("Hay un resultado! :) ");
            })
            .catch( error => {
                console.error('No hay coincidencia! El error es: ', error);
            });
    };    

    return(
        <>
            <h1>Busque un producto por su ID:</h1>
            <form>
                <label for="id">ID: </label>
                <input id="id" name="id"/>
                <input onClick= { handleSumbit } type="submit" value="Baja!"/>
            </form>
        </>
    );
};

export default ProductByID;