import React, { useContext, useState } from "react";
import "./ShopHeader.css";
import logo from "../../assets/images/logo.png";
import cart_icon from "../../assets/images/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import userImage from "../../assets/images/user.png";
import { CartContext } from "../../context/CartContext";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import Profile from "../../scenes/Shop/Profile";
import { BASE_URL } from "../../config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"


const ShopHeader = () => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, token, dispatch } = useContext(authContext);
  const { cart } = useContext(CartContext);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [change, setChange] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  const handleUpdate = async (updatedItem) => {
    console.log("🚀 ~ handleUpdate ~ updatedItem:", updatedItem);

  
    const res = await fetch(`${BASE_URL}/users/update/${updatedItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    const result = await res.json();
    console.log("🚀 ~ handleUpdate ~ res:", result);
    setChange(!change);
    handleCloseEditDialog();
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  return (
    <div className="navbar">
      <div onClick={() => navigate("/")} className="nav-logo">
        <img src={logo} alt="Văn phòng phẩm logo" />
        <p>VĂN PHÒNG PHẨM</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("home");
            navigate("/");
          }}
        >
          Trang Chủ{menu === "home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("shopcategory");
            navigate("/shopcategory");
          }}
        >
          Sản phẩm
          {menu === "shopcategory" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {token && user ? (
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {user.photo === null ? (
              <img src={userImage} className="img-user" alt="" />
            ) : (
              <img src={user.photo} className="img-user" alt="" />
            )}
            <h2 style={{ whiteSpace: "nowrap" }}>{user?.name}</h2>
            {showDropdown && (
              <div className="dropdown-menu">
                <div
                  onClick={() => setOpenEditDialog(true)}
                  className="dropdown-item"
                >
                  Profile
                </div>
                <div onClick={handleLogout} className="dropdown-item">
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{cart?.length}</div>
      </div>
      <Dialog open={openEditDialog}>
        <DialogContent>
          <Profile userData={user} updateUser={handleUpdate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShopHeader;
