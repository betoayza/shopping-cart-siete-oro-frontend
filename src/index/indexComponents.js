import MainAdmin from "../components/pure/MainAdmin";
import MainUser from "../components/container/MainUser";
import Home from "../pages/home/Home";
import ShoppingCart from "../../src/pages/users/ShoppingCart";

import { AllOrders } from "../pages/orders/AllOrders";
import { AllOrdersUser } from "../pages/orders/AllOrdersUser";
import DeleteOrder from "../components/container/DeleteOrder";

import AllProducts from "../pages/products/AllProducts";
import DeleteProduct from "../components/container/DeleteProduct";
import { ModifyProduct } from "../components/container/ModifyProduct";
import { SearchProductByCode } from "../components/container/SearchProductByCode";
import { AddProduct } from "../components/container/AddProduct";

import { AllUsers } from "../pages/users/AllUsers";
import { SearchUser } from "../components/container/SearchUser";
import { UserCard } from "../components/pure/UserCard";
import DeleteUser from "../components/container/DeleteUser";

import SearchingBar from "../components/container/SearchingBar";

import UserProfile from "../components/container/UserProfile";
import Login from "../components/pure/forms/Login";
import SignUp from "../components/pure/forms/SignUp";

import { Contact } from "../pages/contact/Contact";

import { Error404 } from "../pages/404/Error404";
import { SuccessPayment } from "../components/container/SuccessPayment";
import { PendingPayment } from "../components/container/PendingPayment";
import { FailedPayment } from "../components/pure/FailedPayment";
import { BaseLayout } from "../base/BaseLayout";

export {
  BaseLayout,
  SearchingBar,
  MainAdmin,
  MainUser,
  Home,
  ShoppingCart,
  AllOrders,  
  AllOrdersUser,
  DeleteOrder,
  AllProducts,
  DeleteProduct,
  ModifyProduct,
  AddProduct,
  SearchProductByCode,
  AllUsers,
  SearchUser,
  DeleteUser,
  Error404,
  Login,
  SignUp,
  UserProfile,
  FailedPayment,
  SuccessPayment,
  PendingPayment,
  Contact,
  UserCard,
};
