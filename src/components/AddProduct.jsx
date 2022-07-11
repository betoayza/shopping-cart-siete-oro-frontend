import axios from "axios";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  //const fileInput=useRef();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      code: Date.now(),
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
      status: "Active",
    },
  });
  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = async (data, e) => {
    //e.preventDefault();   

    const options = {
      url: '/api/admin/product/add',  
      method: 'post',    
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,        
      },
      data: form,
    };

    await axios.request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("Alta exitosa!");
        } else {
          alert("Alta fallida :(");
        }
      })
      .catch((error) => error);
    e.target.reset();
  };

  return (
    <>
      <h1>Alta producto:</h1>
      <div className="form-group w-25">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input
            {...register("code", { required: { value: true } })}
            type="hidden"
            className="form-control"
          />

          <input
            {...register("name", {
              required: { value: true, message: "Especifique nombre" },
            })}
            type="text"
            className="form-control mb-2"
            placeholder="Nombre..."
          />

          {errors.name && (
            <span className="text-danger text-small d-block mb-2">
              <p>{errors.name.message}</p>
            </span>
          )}

          <input
            {...register("description", {
              required: { value: true, message: "Especifique descripcion" },
            })}
            type="text"
            className="form-control mb-2"
            placeholder="Descripcion..."
          />

          {errors.description && (
            <span className="text-danger text-small d-block mb-2">
              <p>{errors.description.message}</p>
            </span>
          )}

          <input
            {...register("price", {
              required: { value: true, message: "Especifique precio" },
            })}
            type="number"
            className="form-control mb-2"
            placeholder="Precio..."
          />

          {errors.price && (
            <span className="text-danger text-small d-block mb-2">
              <p>{errors.price.message}</p>
            </span>
          )}

          <input
            {...register("stock", {
              required: { value: true, message: "Especifique stock" },
            })}
            type="number"
            className="form-control mb-2"
            placeholder="Stock..."
          />

          {errors.stock && (
            <span className="text-danger text-small d-block mb-2">
              <p>{errors.stock.message}</p>
            </span>
          )}

          <input
            {...register("image", {
              required: { value: true, message: "Especifique imagen" },
            })}
            type="file"
            accept="image/*"
            className="form-control mb-2"
            width="200px"
            height="200px"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setValue("image", e.target.files[0]);
            }}
          />

          {errors.image && (
            <span className="text-danger text-small d-block mb-2">
              <p>{errors.image.message}</p>
            </span>
          )}

          <input
            {...register("status", { required: { value: true } })}
            type="hidden"
            className="form-control"
          />

          <input type="submit" className="btn btn-primary" value="Agregar" />
        </form>
      </div>
    </>
  );
};

export default AddProduct;
