import "./clost-friend.css";
import React, { memo } from "react";
import { PF } from "../../config";

export default memo(function CloseFriend(props) {
  const { user } = props;
  return (
    <li className="sidebar-friend">
      <img
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "/person/noAvatar.png"
        }
        alt=""
        className="sidebar-friend-avatar"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          objectFit: "cover",
          marginRight: "5px",
        }}
      />
      <span className="sidebar-friend-name">{user.username}</span>
    </li>
  );
});
