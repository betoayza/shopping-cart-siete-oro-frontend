import axios from 'axios';
import React, {useEffect} from 'react';


//a travez de un formulario maneja la modificacion

const ModifyProduct = () => {    

    const handleSubmit = async (e) => {
        const url = "/admin/modif-product"; 
        await axios.post(url, e.value.target)
            .then( res => {
                console.log("Modificación exitosa!");
            })
            .catch( error => {
                console.error("El error es: ", error);
            });
    };

    useEffect( () => {
        handleSubmit()
    } , [])

    return(
        <>
            <h1>Modifique un producto</h1>
            <h2>Ingrese los nuevos datos:</h2>
            <form>
                <label for="name">Nombre: </label>
                <input id="name" name="name"/>
                <label for="desc">Descripciopn: </label>
                <input id="desc" name="desc"/>
                <label>Precio: </label>
                <input id="price" name="price"/>
                <label>Cantidad: </label>
                <input id="stock" name="stock"/>
                <label>Imagen: </label>
                <input onClick={ handleSubmit } type="submit" value="Enviar!"/>
            </form>
        </>
    );
}

export default ModifyProduct;