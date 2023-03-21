import React from "react";
import { createHashRouter } from "react-router-dom";
import * as Components from "../index/indexComponents";

export const router = createHashRouter({
  path: "/",
  element: <BaseLayout />,
  errorElement: <Components.Error404 />,
  children: [
    {
      index: true,
      element: <Components.Home />,
    },
    {
      path: "login",
      element: <Components.Login />,
    },
    {
      path: "signup",
      element: <Components.SignUp />,
    },
    {
      path: "user/:username/:code",
      element: <Components.MainUser />,
    },
    {
      path: "user/:username/:code/profile",
      element: <Components.UserProfile />,
    },
    {
      path: "user/:username/shopping-cart/:userCode",
      element: <Components.ShoppingCart />,
    },
    {
      path: "user/:username/:code/orders",
      element: <Components.AllOrdersUser />,
    },
    {
      path: "contact/:username/:code",
      element: <Components.Contact />,
    },
    {
      path: "user/shopping-cart/:userCode/success",
      element: <Components.SuccessPayment />,
    },
    {
      path: "failure",
      element: <Components.FailedPayment />
    },
    {
      path: "user/shopping-cart/:userCode/pending", 
      element: <Components.PendingPayment />
    },
    {
      path: "contact/:username/:code",
      element: <Components.Contact />
    },
    {
      path: "admin",
      element: <Components.MainAdmin />,
    },
    {
      path: "admin/products/all",
      element: <Components.AllProducts />,
    },
    {
      path: "admin/products/add",
      element: <Components.AddProduct />
    },
    {
      path: "admin/products/modify",
      element: <Components.ModifyProduct />
    },
    {
      path: "admin/products/delete",
      element: <Components.DeleteProduct />
    },
    {
      path: "admin/users/all",
      element: <Components.AllUsers />,
    },
    {
      path: "admin/users/delete",
      element:  <Components.DeleteUser />
    },
    {
      path: "admin/users/code",
      element: <Components.SearchUser />
    },
    {
      path: "admin/orders/all",
      element: <Components.AllOrders />,
    },
  ],
});
