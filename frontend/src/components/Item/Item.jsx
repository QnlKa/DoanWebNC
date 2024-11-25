import React, { useContext } from "react";
import "./Item.css";
import { Button } from "@mui/material";
import { CartContext } from "../../context/CartContext";

const Item = (props) => {
  const { dispatch } = useContext(CartContext);
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: props,
    });
  };
  return (
    <div className="item">
      <div style={{ cursor: "pointer" }} onClick={props.onClick}>
        <img src={props.image} alt="" />
        <p>{props.name}</p>
        <div className="item-prices">{props.price} VNĐ</div>
        <span>đã bán: {props.sold}+</span>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </Button>
      </div>
    </div>
  );
};

export default Item;
