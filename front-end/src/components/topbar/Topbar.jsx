import React, { memo, useContext, useState, useRef } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import "./topbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { PF, host } from "../../config";
import { debounce } from "../../utils/debounce";

// const PF = "http://localhost:8000/assets/";

export default memo(function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const search = useRef();

  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch({ type: "LOG_OUT" });
    // 退出后，回到首页
    navigate("/");
  };

  const handleChange = debounce(() => {
    if (!search.current.value) {
      setUsers([]);
      return;
    }
    axios
      .get(`${host}/api/users/search/${search.current.value}`)
      .then((res) => {
        if (res.data.length) {
          setUsers(res.data);
        } else {
          setUsers([]);
        }
      });
  }, 100);

  // console.log(users);

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Timosocial</span>
        </Link>
      </div>
      <div className="topbar-center">
        <div className="search-bar">
          <div className="search-bar-wrapper">
            <Search className="search-icon" />
            <input
              placeholder="搜索用户"
              className="search-input"
              ref={search}
              onChange={() => handleChange()}
            />
          </div>
          <div
            className="search-users"
            style={{ display: users.length ? "block" : "none" }}
          >
            {users.map((user) => {
              return (
                <Link
                  to={`/profile/${user.id}`}
                  key={user?.id}
                  style={{ textDecoration: "none" }}
                >
                  <div className="search-item">
                    <img
                      className="item-img"
                      src={
                        user?.profilePicture
                          ? PF + user?.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                    />
                    <span className="user-name">{user.username}</span>
                  </div>
                </Link>
              );
            })}
          </div>
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
