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

    return await axios
      .request(url, options)
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

    return await axios
      .delete(url, options)
      .then((res) => {
        console.log(res);
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

    return await axios(url, options)
      .then((res) => {
        if (res.status === 200) return true;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const getUser = async (code) => {
    const url = `${import.meta.env.VITE_API}/admin/users/search/one`;
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

    return await axios
      .get(url, options)
      .then((res) => {
        console.log(res);
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  // PRODUCTS MANAGEMENT
  const getAllProducts = async () => {
    // TO USERS TOO
    const url = `${import.meta.env.VITE_API}/products/all`;
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

  const getProductsAdmin = async (term) => {
    const url = `${import.meta.env.VITE_API}/admin/products/search`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
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

    return await axios
      .request(url, options)
      .then((res) => {
        console.log(res);
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
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

  // ORDERS MANAGEMENT
  const getAllOrders = async () => {
    const url = `${import.meta.env.VITE_API}/admin/orders/all`;
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
        console.log(res.data);
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const changeOrderState = async (code, newState) => {
    const url = `${import.meta.env.VITE_API}/admin/orders/change-state`;
    const options = {
      method: "PUT",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: { code, newState },
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

  const getOrderProducts = async (itemsIDs) => {
    const url = `${import.meta.env.VITE_API}/products/get/list`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      params: { itemsIDs },
    };

    return await axios
      .request(url, options)
      .then((res) => {
        console.log(res);
        if (res.status === 200) return res.data;
        else throw new error(res.statusText);
      })
      .catch((error) => error);
  };

  const getOrders = async (term) => {
    const url = `${import.meta.env.VITE_API}/admin/orders/search`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      params: { term },
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

  //**************LOGIN & SIGNUP********
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
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  //*******************NON USER*******
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

  // **************USERS*************
  const getShoppingCart = async (userCode) => {
    const url = `${import.meta.env.VITE_API}/user/shopping-cart`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      params: { userCode },
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

  const getProductsUser = async (term) => {
    const url = `${import.meta.env.VITE_API}/products/get`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      params: { term },
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

  const getUserProfile = async (code) => {
    const url = `${import.meta.env.VITE_API}/admin/users/search/one`;
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

    return await axios
      .request(url, options)
      .then((res) => {
        console.log(res);
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const modifyProfile = async (form) => {
    const url = `${import.meta.env.VITE_API}/user/profile/modify`;
    const options = {
      method: "PUT",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: form,
    };

    return await axios
      .request(url, options)
      .then((res) => {
        console.log(res);

        if (res.status === 200) return true;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const getAllUserOrders = async (userCode) => {
    const url = `${import.meta.env.VITE_API}/user/orders/all`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      params: { userCode },
      timeout: 3001,
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

  const getOrderItems = async (orderItems) => {
    const url = `${import.meta.env.VITE_API}/user/orders/items/list`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      params: { orderItems },
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

  const cancelOrder = async (code, userCode, orderItemsData) => {
    const url = `${import.meta.env.VITE_API}/user/orders/delete`;
    const options = {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Headers": "*",
      //     Accept: "application/json",
      //   },
      timeout: 3000,
      data: { code, userCode, orderItemsData },
    };

    return await axios
      .delete(url, options)
      .then((res) => {
        console.log(res);

        if (res.status === 200) return true;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  // RETURN ALL FUNCTIONS
  return {
    getAllUsers,
    deleteUser,
    activateUser,
    getUser,
    getAllProducts,
    getProductsAdmin,
    modifyProduct,
    addProduct,
    deleteProduct,
    activateProduct,
    getAllOrders,
    changeOrderState,
    getOrderProducts,
    getOrders,
    getProduct,
    getActiveProducts,
    getShoppingCart,
    getAllUserOrders,
    getOrderItems,
    cancelOrder,
    getProductsUser,
    getUserProfile,
    modifyProfile,
    login,
  };
};
