import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { CartContext } from "../../../context/CartContext";
import ShopHeader from "../../../components/ShopHeader/ShopHeader";
import Footer from "../../../components/Footer/Footer";
import "./Checkout.css";
import { BASE_URL } from "../../../config";
import { authContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { cart, dispatch } = useContext(CartContext);
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  console.log("🚀 ~ Checkout ~ user:", user);

  const formatValue = (value) => {
    return `${value.toLocaleString("vi-VN")}.000 VNĐ`;
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, item) => (item ? total + item.price * item.quantity : total),
      0
    );
    return subtotal;
  };
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    cart: cart,
    totalPrice: calculateTotal(),
  });
  

  const calculateTotalPrice = (unitPrice, quantity) => {
    return unitPrice * quantity;
  };
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckout = () => {
    // Kiểm tra các trường thông tin trong form
    if (!form.name || !form.email || !form.phone || !form.address) {
      // Nếu thiếu thông tin, hiển thị thông báo
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return; // Dừng lại nếu thiếu thông tin
    }
  
    // Nếu tất cả thông tin đã đầy đủ, xử lý thanh toán
    alert('Thanh toán thành công!');
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form);
    const res = await fetch(`${BASE_URL}/orders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    } else {
      navigate("/checkoutsuccess");
      dispatch({
        type: "CHECK_OUT",
      });
    }
  };
  return (
    <>
      <ShopHeader />

      <Box p={3} className="cart-container">
        <Typography variant="h4" gutterBottom style={{ fontWeight: 700 }}>
          Thanh Toán
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Typography variant="h5">Danh sách sản phẩm</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell>Tên Sản phẩm</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="product-image"
                        />
                        <Typography>{item.name}</Typography>
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {formatValue(
                          calculateTotalPrice(item.price, item.quantity)
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h5" gutterBottom>
              Thông tin người nhận
            </Typography>
            <form>
              <div>
                <input
                  type="text"
                  value={form.name}
                  name="name"
                  placeholder="Họ tên"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  value={form.email}
                  name="name"
                  placeholder="Họ tên"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  value={form.phone}
                  name="phone"
                  placeholder="Số điện thoại"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  value={form.address}
                  name="address"
                  placeholder="Địa chỉ"
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="form-and-total">
                <Typography className="grand-total" variant="h5" gutterBottom>
                  Tổng tiền: {formatValue(calculateTotal())}
                </Typography>
                <button className="checkout-button" onClick={handleCheckout}>
                  Đặt hàng
                </button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Checkout;
