import React, { memo, useState, useEffect } from "react";
import { format } from "timeago.js";
import "./message.css";
import axios from "axios";
import { PF, host } from "../../config";

// own類控制是否是自己發的消息

export default memo(function Message({ own, message }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 得到用户信息

    const getUser = async (friendId) => {
      try {
        const res = await axios.get(`${host}/api/users/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser(message.sender_id);
  }, [message]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-top">
        <img
          className="message-img"
          src={
            user?.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <p className="message-text">{message.text}</p>
      </div>
      <div className="message-bottom">{format(message.createAt)}</div>
    </div>
  );
});
