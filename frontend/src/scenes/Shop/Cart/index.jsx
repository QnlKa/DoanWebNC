import React, { useContext } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShopHeader from "../../../components/ShopHeader/ShopHeader";
import Footer from "../../../components/Footer/Footer";
import { CartContext } from "../../../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, dispatch } = useContext(CartContext);

  // Hàm định dạng giá trị
  const formatValue = (value) => {
    // Kiểm tra giá trị trước khi sử dụng toLocaleString
    if (value === undefined || value === null) return "Giá trị không hợp lệ";
    return `${value.toLocaleString("vi-VN")}.000 VNĐ`;
  };

  // Tính tổng giá của 1 sản phẩm
  const calculateTotalPrice = (unitPrice, quantity) => {
    return unitPrice * quantity;
  };

  // Tính tổng giá tất cả sản phẩm trong giỏ hàng
  const calculateGrandTotal = () => {
    return cart.reduce(
      (total, item) =>
        item && item.price && item.quantity
          ? total + calculateTotalPrice(item.price, item.quantity)
          : total,
      0
    );
  };

  // Các handler xử lý tăng, giảm số lượng và xóa sản phẩm trong giỏ
  const handleIncrease = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  };
  const handleDecrease = (item) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: item,
    });
  };
  const handleDelete = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
  };

  // Chuyển tới trang mua hàng
  const handleBuyItem = () => {
    navigate("/shopcategory");
  };

  return (
    <>
      <ShopHeader />
      {cart?.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Chưa có sản phẩm trong giỏ hàng</h1>
          <button className="buttonBuy" onClick={() => handleBuyItem()}>
            <span style={{ padding: "10px", lineHeight: "50px" }}>
              Mua hàng
            </span>
          </button>
        </div>
      ) : (
        <Box p={3} className="cart-container">
          <Typography variant="h4" gutterBottom className="cart-heading">
            Giỏ hàng
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="table-header">
                  <TableCell>Tên Sản phẩm</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Thành tiền</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id || item.name}> {/* Sử dụng key duy nhất */}
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="product-image"
                      />
                      <Typography>{item.name}</Typography>
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDecrease(item)}>
                        <RemoveIcon />
                      </IconButton>
                      {item.quantity}
                      <IconButton onClick={() => handleIncrease(item)}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {formatValue(calculateTotalPrice(item.price, item.quantity))}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(item)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="total-checkout-container">
            <Typography variant="h6" className="grand-total">
              Tổng tiền: {formatValue(calculateGrandTotal())}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="checkout-button"
              onClick={() => navigate("/checkout")}
            >
              Thanh toán
            </Button>
          </Box>
        </Box>
      )}

      <Footer />
    </>
  );
};

export default Cart;
