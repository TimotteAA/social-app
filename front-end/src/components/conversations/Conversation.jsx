import React, { memo, useState, useEffect } from "react";
import "./conversation.css";

import { PF } from "../../config";
import request from "../../service/request";

export default memo(function Conversation(props) {
  const { conversation, currentUser } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 得到聊天对方的id
    const friendId =
      conversation.receiver_id !== currentUser.id
        ? conversation.receiver_id
        : conversation.sender_id;

    const getUser = async (friendId) => {
      try {
        const res = await request.get(`/api/users/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser(friendId);
  }, [conversation, currentUser]);

  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
        className="conversation-img"
      />
      <span className="conversation-name">{user?.username}</span>
    </div>
  );
});
