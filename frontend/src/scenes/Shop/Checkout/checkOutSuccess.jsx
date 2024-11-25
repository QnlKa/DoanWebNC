import React from "react";
import ShopHeader from "../../../components/ShopHeader/ShopHeader";
import Footer from "../../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const CheckOutSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <ShopHeader />
      <div className="container">
        <h1 style={{ color: "green" }}>Đặt hàng thành công</h1>
        <p>
          Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn đặt hàng của bạn
          đang được xử lý và sẽ được giao đến bạn sớm nhất có thể.
        </p>
        <button className="checkout-button" onClick={() => navigate("/")}>
          Quay lại trang chủ
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CheckOutSuccess;
