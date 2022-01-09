import React, { memo, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { RssFeed } from "@mui/icons-material";

import CloseFriend from "../close-friend/CloseFriend";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { host } from "../../config";

export default memo(function Sidebar() {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${host}/api/users/friends/${user?.id}`).then((res) => {
      setFriends(res.data);
    });
  }, [user?.id]);

  // console.log(friends);

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <ul className="sidebar-list">
          <Link to="/messenger" style={{ textDecoration: "none" }}>
            <li className="sidebar-list-item">
              <RssFeed className="sidebar-icon" />
              <span className="sidebar-list-item-text">Chat</span>
            </li>
          </Link>
        </ul>
        {/* <button className="siderbar-btn">Show More</button> */}
        <hr className="sidebar-hr"></hr>
        <ul className="sidebar-friend-list">
          {friends.length &&
            friends.map((user) => {
              return (
                <Link
                  to={`/profile/${user.id}`}
                  key={user.id}
                  style={{ textDecoration: "none" }}
                >
                  <CloseFriend user={user} />
                </Link>
              );
            })}
        </ul>
      </div>
    </div>
  );
});
