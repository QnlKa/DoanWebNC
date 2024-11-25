import { Routes, Route } from "react-router-dom";
import Admin from "../scenes/Admin/dashboard/index";
import Home from "../scenes/Shop/Home/index";
import ShopCategory from "../scenes/Shop/ShopCategory/index";
import Cart from "../scenes/Shop/Cart/index";
import LoginSignup from "../scenes/Shop/LoginSignup/LoginSignup";
import LoginAdmin from "../scenes/Admin/Login/LoginAdmin";
import ProtectedRouter from "./ProtectedRouter";
import LoginClient from "../scenes/Shop/Login/LoginClient";
import Checkout from "../scenes/Shop/Checkout";
import ProductDetail from "../scenes/Shop/ProductDetail";
import CheckOutSuccess from "../scenes/Shop/Checkout/checkOutSuccess";
import ProtectedRouterClient from "./ProtectedRouterClient";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin/*"
        element={
            <Admin />
        }
      />
      <Route path="/shopcategory" element={<ShopCategory />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginClient />} />
      <Route path="/register" element={<LoginSignup />} />
      <Route path="/loginadmin" element={<LoginAdmin />} />
      <Route
        path="/checkout"
        element={
          <ProtectedRouterClient allowedRoles={"user"}>
            <Checkout />
          </ProtectedRouterClient>
        }
      />
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route path="/checkoutsuccess" element={<CheckOutSuccess />} />
    </Routes>
  );
};

export default Routers;
