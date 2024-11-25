import React, { useContext, useState } from "react";
import "./LoginClient.css";
import { BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../context/AuthContext";

const LoginClient = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Thêm state để lưu thông báo lỗi
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok) {
        // Xử lý lỗi nếu có
        setError(result.message || "Something went wrong");
        return;
      }

      // Nếu đăng nhập thành công, dispatch action và điều hướng
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });
      navigate("/"); // Điều hướng về trang chủ sau khi đăng nhập
    } catch (err) {
      // Xử lý các lỗi kết nối hoặc lỗi không xác định
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="login-client">
      <div className="login-client-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}> {/* Đổi thành onSubmit */}
          <div className="login-client-fields">
            <input
              type="email"
              value={form.email}
              name="email"
              placeholder="Email..."
              onChange={handleChange}
            />
            <input
              type="password"
              value={form.password}
              name="password"
              placeholder="Password..."
              onChange={handleChange}
            />
          </div>
          {error && <p className="login-client-error">{error}</p>} {/* Hiển thị lỗi nếu có */}
          <button type="submit">Login</button> {/* Dùng type="submit" thay vì onClick */}
        </form>
        <p className="login-client-login">
          Don't have an account?
          <span onClick={() => navigate("/register")}>Register here</span>
        </p>
      </div>
    </div>
  );
};

export default LoginClient;
