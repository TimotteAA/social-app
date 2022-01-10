import React, { memo, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default memo(function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFecthing, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  // console.log(user);

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">Timosocial</h3>
          <span className="login-desc">和您的朋友一起交流，分享生活。</span>
        </div>
        <div className="login-right" onSubmit={(e) => handleClick(e)}>
          <div className="login-box">
            <form className="login-box">
              <input
                className="login-input"
                placeholder="email"
                type="email"
                required
                ref={email}
              />
              <input
                className="login-input"
                placeholder="password"
                type="password"
                required
                ref={password}
                minLength="6"
              />
              <button className="login-button">
                {isFecthing ? "Loading" : "Log in"}
              </button>
              {/* <span className="login-forget">Forgot password</span> */}
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button className="login-register-button">
                  Create a new Account
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
