import MainAdmin from "../components/pure/MainAdmin";
import MainUser from "../components/container/MainUser";
import Home from "../pages/home/Home";
import ShoppingCart from "../components/container/ShoppingCart";

import { AllOrders } from "../pages/orders/AllOrders";
import { OrderByCode } from "../components/container/OrderByCode";
import UsersOrdersAdmin from "../components/container/UsersOrdersAdmin";
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

import SearchingBar from "../components/pure/SearchingBar";

import UserProfile from "../components/container/UserProfile";
import Login from "../components/pure/Login";
import SignUp from "../components/pure/SignUp";

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
  OrderByCode,
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
  UsersOrdersAdmin,
  UserProfile,
  FailedPayment,
  SuccessPayment,
  PendingPayment,
  Contact,
  UserCard,
};
