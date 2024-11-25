import React, { useContext, useState } from "react";
import "./LoginAdmin.css";
import { BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../context/AuthContext";

const LoginAdmin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
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
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        user: result.data,
        token: result.token,
        role: result.role,
      },
    });
    navigate("/admin");
  };
  return (
    <div className="login-admin">
      <div className="login-admin-container">
        <h1>Sign In</h1>
        <form>
          <div className="login-admin-fields">
            <input
              type="text"
              value={form.email}
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              value={form.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <p className="login-admin-login">
          Don't have an account? <span>Register here</span>
        </p>
      </div>
    </div>
  );
};

export default LoginAdmin;
