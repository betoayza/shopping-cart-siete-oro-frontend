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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.delete(url, options);

      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios(url, options);

      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.get(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios(url, options);

      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  };

  const addProduct = async (data) => {
    const url = `${import.meta.env.VITE_API}/admin/product/add`;
    const options = {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: data,
    };

    try {
      const result = await axios(url, options);

      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_API}/admin/products/delete`,
        options
      );

      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.delete(url, options);

      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) {
        return result.data;
      } else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.delete(url, options);

      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.delete(url, options);
      if (result.status === 200) return result.data;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return result.data.comments;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  };

  const checkIsItemInCart = async (userCode, prodCode) => {
    const url = `${
      import.meta.env.VITE_API
    }/user/shopping-cart/check-item-added`;
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      params: { userCode, prodCode },
    };

    try {
      const result = await axios.request(url, options);
      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  };

  const addItemToCart = async (productCode, userCode) => {
    const url = `${import.meta.env.VITE_API}/user/shopping-cart/add`;
    const options = {
      method: "PUT",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: { productCode, userCode },
    };

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  };

  const removeItemFromCart = async (prodCode, userCode, index) => {
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

    try {
      const result = await axios.delete(url, options);

      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  };

  const postItemComment = async (userCode, comment, productCode) => {
    const url = `${import.meta.env.VITE_API}/user/comment/add`;
    const options = {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: { userCode, comment, productCode },
    };

    try {
      const result = await axios.request(url, options);

      if (result.status === 200) return true;
      else throw new Error(result.statusText);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  };

  const removeItemComment = async (index, productCode) => {
    const options = {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: { index, productCode },
    };

    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_API}/user/comment/delete`,
        options
      );

      if (result.status === 200) return result.data;
      else throw new Error();
    } catch (error) {
      console.error(error);
      throw new Error();
    }
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
    checkIsItemInCart,
    addItemToCart,
    removeItemFromCart,
    postItemComment,
    removeItemComment,
    login,
    signup,
  };
};
