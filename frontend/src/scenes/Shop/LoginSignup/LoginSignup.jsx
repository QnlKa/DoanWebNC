import React, { useContext, useState } from "react";
import "./LoginSignup.css";
import { BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../context/AuthContext";

const LoginSignup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
    const res = await fetch(`${BASE_URL}/auth/register`, {
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
    navigate("/login");
  };
  return (
    <div className="login-client">
      <div className="login-client-container">
        <h1>Sign In</h1>
        <form>
          <div className="login-client-fields">
            <input
              type="text"
              value={form.name}
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
            <input
              type="text"
              value={form.email}
              name="email"
              placeholder="email"
              onChange={handleChange}
            />
            <input
              type="password"
              value={form.password}
              name="password"
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Register
          </button>
        </form>
        <p className="login-client-login">
          You have an account?{" "}
          <span onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
