import React, { memo } from "react";
import "./online.css";
import { PF } from "../../config";

export default memo(function Online(props) {
  const { user } = props;
  return (
    <li className="rightbar-friend">
      <div className="profile-img-container">
        <img
          className="rightbar-profile-img"
          src={PF + user.profilePicture}
          alt=""
        />
        <span className="rightbar-online"></span>
      </div>
      <span className="rightbar-username">{user.username}</span>
    </li>
  );
});
