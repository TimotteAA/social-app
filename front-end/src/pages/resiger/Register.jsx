import React, { memo, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { host } from "../../config";

export default memo(function Register() {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordAgain = useRef();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      password.current.setCustomValidity("密码不一致！");
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
      };
      try {
        await axios.post(`${host}/api/auth/register`, user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">Timosocial</h3>
          <span className="login-desc">连接您与您身边的人。</span>
        </div>
        <div className="login-right">
          <form className="login-box" onSubmit={(e) => handleClick(e)}>
            <div className="login-box">
              <input
                className="login-input"
                placeholder="username"
                type="text"
                ref={username}
                required
              />
              <input
                className="login-input"
                placeholder="email"
                type="email"
                ref={email}
                required
              />
              <input
                className="login-input"
                placeholder="password"
                type="password"
                ref={password}
                required
                minLength="6"
              />

              <input
                className="login-input"
                placeholder="password again"
                type="password"
                ref={passwordAgain}
                required
              />
              <button className="login-button" type="submit">
                Sign Up
              </button>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button className="login-register-button">
                  Log into Account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
