import React, { memo, useState, useEffect } from "react";
import "./chatonline.css";
import axios from "axios";

import { PF, host } from "../../config";

export default memo(function Chatonline(props) {
  const { onlineUsers, currentUser, setCurrentChat } = props;

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    // 获取当前用户的信息
    const getFriends = async () => {
      console.log(currentUser.id);
      const res = await axios.get(
        `${host}/api/users/friends/${currentUser.id}`
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentUser]);

  useEffect(() => {
    // 从onlineUsers里，找到是自己friends的
    const res = [];
    for (let friend of friends) {
      for (let user of onlineUsers) {
        if (user.userId === friend.id) {
          res.push(friend);
        }
      }
    }

    setOnlineFriends(res);
  }, [friends, onlineUsers]);

  // console.log(onlineUsers, friends);
  console.log(onlineUsers);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/conversations/find/${currentUser.id}/${user.id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat-online">
      {onlineFriends.length &&
        onlineFriends.map((online) => {
          // console.log(online);
          return (
            <div
              className="chat-online-friend"
              key={online.id}
              onClick={() => handleClick(online)}
            >
              <div className="chat-online-img-container">
                <img
                  className="char-online-img"
                  src={
                    online.profilePicture
                      ? PF + online.profilePicture
                      : PF + "/person/noAvatar.png"
                  }
                  alt=""
                />
                <div className="chat-online-badge"></div>
              </div>
              <span className="char-online-name">{online.username}</span>
            </div>
          );
        })}
    </div>
  );
});
