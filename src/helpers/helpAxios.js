import axios from "axios";

export const helpAxios = () => {
  // ***********************ADMIN****************************
  // USERS MANAGEMENT
  const getAllUsers = async () => {
    const url = `${import.meta.env.VITE_API}/admin/users/all`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
    };

    return await axios(url, options)
      .then((res) => {
        console.log(res);
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const deleteUser = async (code) => {
    const url = `${import.meta.env.VITE_API}/admin/users/delete`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: { code },
    };

    return await axios.delete(url, options)
      .then((res) => {
        console.log(res)
        if (res.status === 200) return true;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const activateUser = async (code) => {
    const url = `${import.meta.env.VITE_API}/admin/users/activate`;
    const options = {
      method: "put",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: { code },
    };

    return await axios(url, options).then((res) => {
      if (res.status === 200) return true;
      else throw new Error(res.statusText);
    });
  };

  // PRODUCTS
  const getAllProducts = async () => {
    const url = `${import.meta.env.VITE_API}/products/all`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      timeout: 5000,
    };

    return await axios
      .request(url, options)
      .then((res) => {
        console.log(res);
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  // Search
  const getProductsAdmin = async (term) => {
    const url = `${import.meta.env.VITE_API}/admin/products/search`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      timeout: 3000,
      params: { term },
    };

    return await axios(url, options)
      .then((res) => {
        console.log(res);
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const getProduct = async (code) => {
    const url = `${import.meta.env.VITE_API}/admin/products/search/code`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      params: { code },
    };

    return await axios(url, options)
      .then((res) => {
        console.log(res);
        if (!res.ok) throw new Error(res.statusText);

        console.log(res.json());
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // return data
      })
      .catch((error) => error);
  };

  const modifyProduct = async (data) => {
    const url = `${import.meta.env.VITE_API}/admin/product/modify`;

    const options = {
      method: "PUT",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: data,
    };

    return await axios(url, options)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);

        return true;
      })
      .catch((error) => error);
  };

  const addProduct = async (data) => {
    const url = `${import.meta.env.VITE_API}/admin/product/add`;
    const options = {
      method: "post",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: data,
    };

    return await axios(url, options)
      .then((res) => {
        if (res.status === 200) return true;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const deleteProduct = async (code) => {
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: { code },
    };

    return await axios
      .delete(`${import.meta.env.VITE_API}/admin/products/delete`, options)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) return true;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const activateProduct = async (code) => {
    const url = `${import.meta.env.VITE_API}/admin/products/activate`;
    const options = {
      method: "put",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: { code },
    };

    return await axios
      .request(url, options)
      .then((res) => {
        console.log(res);
        if (res.status === 200) return true;
        else throw new Error(res.statusText);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // LOGIN & SIGNUP
  const login = async (form) => {
    const url = `${import.meta.env.VITE_API}/login`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      params: form,
    };

    return await axios
      .request(url, options)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);

        return res.data.json();
      })
      .catch((error) => error);
  };

  //NON USER
  const getActiveProducts = async () => {
    const url = `${import.meta.env.VITE_API}/products/active/all`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
    };

    return await axios
      .request(url, options)
      .then((res) => {
        console.log(res);
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  // RETURN ALL FUNCTIONS
  return {
    getAllUsers,
    deleteUser,
    activateUser,
    getAllProducts,
    getProductsAdmin,
    modifyProduct,
    addProduct,
    deleteProduct,
    activateProduct,
    getProduct,
    getActiveProducts,
    login,
  };
};
