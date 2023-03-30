export const helpFetchs = () => {
  // USERS
  const getAllUsers = async () => {
    const url = `${import.meta.env.VITE_API}/admin/users/all`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      timeout: 3000,
    };

    return await fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error("No hay usuarios registrados");

        return res.json();
      })
      .then((data) => data)
      .catch((error) => error);
  };

  const deleteUser = async (code) => {
    const url = `${import.meta.env.VITE_API}/admin/users/delete`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      timeout: 3000,
      data: { code },
    };

    return await fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error("No hay usuarios registrados");

        return true;
      })
      .catch((error) => error);
  };

  const activateUser = async (code) => {
    const url = `${import.meta.env.VITE_API}/admin/users/activate`;
    const options = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      timeout: 3000,
      data: { code },
    };

    return await fetch(url, options).then((res) => {
      if (!res.ok) throw new Error(res.statusText);

      return true.catch((error) => error);
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
      timeout: 3000,
    };

    return await fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);

        return res.json();
      })
      .then((data) => data)
      .catch((error) => error);
  };

  // RETURN ALL FUNCTIONS
  return { getAllUsers, deleteUser, activateUser, getAllProducts };
};
