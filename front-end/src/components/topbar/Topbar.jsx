import React, { memo, useContext } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import "./topbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { PF } from "../../config";

// const PF = "http://localhost:8000/assets/";

export default memo(function Topbar() {
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch({ type: "LOG_OUT" });
    // 退出後回到首頁
    navigate("/");
  };

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Timosocial</span>
        </Link>
      </div>
      <div className="topbar-center">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            placeholder="Search for friend, post or viedo"
            className="search-input"
          />
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-links">
          <span className="topbar-link">Homepage</span>
          <span className="topbar-link">Timeline</span>
        </div>
        <div className="topbar-icons">
          {/* <div className="topbar-icon-item">
            <Person />
            <span className="topbar-icon-badge">1</span>
          </div>
          <div className="topbar-icon-item">
            <Chat />
            <span className="topbar-icon-badge">2</span>
          </div>
          <div className="topbar-icon-item">
            <Notifications />
            <span className="topbar-icon-badge">1</span>
          </div> */}
        </div>
        <Link to={`/profile/${user?.id}`}>
          <img
            src={
              user?.profilePicture
                ? PF + user?.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbar-img"
          />
        </Link>
        <div className="topbar-log-out" onClick={() => handleLogOut()}>
          Log out
        </div>
      </div>
    </div>
  );
});
