import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Components from "./components/indexComponents";

function App() {
  return (
    <div id={"app-div"} className={"bg-body text-secondary vw-100 vh-100"}>
      <div className={"vw-100 vh-100"}>
        <Routes>
          <Route exact path="/" element={<Components.Home />} />

          <Route exact path="/login" element={<Components.Login />} />

          <Route exact path="/signup" element={<Components.SignUp />} />

          <Route
            exact
            path="/user/:username/:code"
            element={<Components.MainUser />}
          />

          <Route exact path="/admin" element={<Components.MainAdmin />} />

          <Route
            exact
            path="/user/:username/:code/profile"
            element={<Components.UserProfile />}
          />

          <Route
            exact
            path="/user/:username/shopping-cart/:userCode"
            element={<Components.ShoppingCart />}
          />

          <Route
            exact
            path="/user/:username/:code/orders"
            element={<Components.AllOrdersUser />}
          />

          <Route
            exact
            path="/admin/users/all"
            element={<Components.AllUsers />}
          />

          <Route
            exact
            path="/admin/users/code"
            element={<Components.SearchUser />}
          />

          <Route
            exact
            path="/admin/users/delete"
            element={<Components.DeleteUser />}
          />

          <Route
            exact
            path="/admin/orders/all"
            element={<Components.AllOrders />}
          />

          <Route
            exact
            path="/admin/orders/received"
            element={<Components.ReceivedOrders />}
          />

          <Route
            exact
            path="/admin/products/add"
            element={<Components.AddProduct />}
          />

          <Route
            exact
            path="/admin/products/delete"
            element={<Components.DeleteProduct />}
          />

          <Route
            exact
            path="/admin/products/modify"
            element={<Components.ModifyProduct />}
          />

          <Route
            exact
            path="/admin/products/all"
            element={<Components.AllProducts />}
          />

          <Route
            exact
            path="/user/shopping-cart/:userCode/success"
            element={<Components.SuccessPayment />}
          />

          <Route exact path="/failure" element={<Components.FailedPayment />} />

          <Route
            exact
            path="/user/shopping-cart/:userCode/pending"
            element={<Components.PendingPayment />}
          />

          <Route exact path="*" element={<Components.Error404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
