import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Components from "./components/indexComponents";

function App() {
  return (
    <div id={"app-div"} className={"bg-body text-secondary vw-100 vh-100"}>
      <BrowserRouter>
        <div className={"vw-100 vh-100"}>
          <Routes>
            <Route exact path="/" element={<Components.Home />} />

            <Route exact path="/login" element={<Components.Login />} />

            <Route exact path="/signup" element={<Components.SignUp />} />

            <Route exact path="/user/:code" element={<Components.MainUser />} />
            
            <Route exact path="/admin" element={<Components.MainAdmin />} />

            <Route
              exact
              path="/user/profile/:code"
              element={<Components.UserProfile />}
            />

            <Route
              exact
              path="/user/shopping-cart/:userCode"
              element={<Components.ShoppingCart />}
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
              path="/user/:code/orders"
              element={<Components.UserOrdersUser />}
            />

            {/* <Route
              exact
              path="/user/orders/delete/:userCode"
              element={<Components.DeleteOrder />}
            /> */}


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
              path="/admin/orders/code"
              element={<Components.OrderByCode />}
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
              path="/admin/products/search/code"
              element={<Components.SearchProductByCode />}
            />

            <Route
              exact
              path="/products/all"
              element={<Components.AllProducts />}
            />

            <Route
              exact
              path="/user/shopping-cart/:userCode/success"
              element={<Components.SuccessPayment />}
            />

            <Route
              exact
              path="/failure"
              element={<Components.FailedPayment />}
            />

            <Route
              exact
              path="/pending"
              element={<Components.PendingPayment />}
            />

            <Route exact path="*" element={<Components.Error404 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
