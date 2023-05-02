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
        if (res.status === 200) return true;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const activateUser = async (code) => {
    const url = `${import.meta.env.VITE_API}/admin/users/activate`;
    const options = {
      method: "PUT",
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
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  // PRODUCTS MANAGEMENT
  const getAllProducts = async () => {
    // USED FOR USERS TOO
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
        if (res.status === 200) return true;
        else throw new Error(res.statusText);
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
        if (res.status === 200) return true;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const activateProduct = async (code) => {
    const url = `${import.meta.env.VITE_API}/admin/products/activate`;
    const options = {
      method: "PUT",
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
        if (res.status === 200) return true;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
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

  const signup = async (form) => {
    const url = `${import.meta.env.VITE_API}/signup`;
    const options = {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: form,
    };
    console.log(form);

    return await axios
      .request(url, options)
      .then((res) => {
        console.log(res);

        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  //*******************NON USER*******
  const getAllActiveProducts = async () => {
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
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const findProducts = async (term) => {
    // and for anonymous user too
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
        if (res.status === 200) return true;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const contactSupport = async (form) => {
    const url = `https://formsubmit.co/ajax/${import.meta.env.VITE_EMAIL_CODE}`;
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 3000,
      data: form,
    };

    return await axios
      .request(url, options)
      .then((res) => {
        if (res.status === 200) return true;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const updateItemCounter = async (userCode, toBuy, itemIndex) => {
    const url = `${import.meta.env.VITE_API}/user/shopping-cart/update/toBuy`;
    const options = {
      method: "PUT",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: { userCode, toBuy, itemIndex },
    };

    return await axios
      .request(url, options)
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const cleanShoppingCart = async (userCode) => {
    const url = `${import.meta.env.VITE_API}/user/shopping-cart/delete/all`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: { userCode },
    };

    return await axios
      .delete(url, options)
      .then((res) => {
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  const removeItem = async (prodCode, userCode, index) => {
    const url = `${import.meta.env.VITE_API}/user/shopping-cart/delete`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: { prodCode, userCode, index },
    };

    return await axios
      .delete(url, options)
      .then((res) => {
        if (res.status === 200) return res.data;
        else throw new Error(res.statusText);
      })
      .catch((error) => error);
  };

  // ******** CARDS **********
  const getProductComments = async (productCode) => {
    const url = `${import.meta.env.VITE_API}/product/code`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      params: { productCode },
    };

    return await axios
      .request(url, options)
      .then((res) => {
        if (res.status === 200) return res.data.comments;
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
    getAllActiveProducts,
    getShoppingCart,
    getAllUserOrders,
    getOrderItems,
    cancelOrder,
    findProducts,
    getUserProfile,
    modifyProfile,
    contactSupport,
    updateItemCounter,
    cleanShoppingCart,
    removeItem,
    getProductComments,
    login,
    signup,
  };
};
