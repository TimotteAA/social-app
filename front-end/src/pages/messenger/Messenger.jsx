import React, { memo, useContext, useState, useEffect, useRef } from "react";

import Conversation from "../../components/conversations/Conversation";
import Topbar from "../../components/topbar/Topbar";
import Message from "../../components/message/Message";
import Chatonline from "../../components/chat-online/Chatonline";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { PF, host } from "../../config";

import { debounce } from "../../utils/debounce";

import { io } from "socket.io-client";
import "./messenger.css";

export default memo(function Messenger() {
  const [conversations, setConversations] = useState([]);
  // 当前的对话框
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  // 新发送的消息
  const [newMessage, setNewMessage] = useState("");
  // socket转发的message
  const [arrivalMessage, setArrivalMessage] = useState(null);

  // 在线的用户
  const [onlineUsers, setOnlineUsers] = useState([]);

  // 已经

  // 搜索用户
  const [users, setUsers] = useState([]);

  const socket = useRef();
  const scrollRef = useRef();
  const search = useRef();

  const { user } = useContext(AuthContext);

  // 跳转到这个页面，就连接socket服务器
  useEffect(() => {
    // socket.current = io("ws://localhost:8900");
    socket.current = io("ws://139.196.224.17:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender_id: data.senderId,
        text: data.text,
        createAt: Date.now(),
      });
    });

    return () => {
      // console.log(socket.current);
      // socket.current.emit("removeUser", socket);
      // 离开该页面后，断开socket连接
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      if (
        currentChat?.receiver_id === arrivalMessage?.sender_id ||
        currentChat?.sender_id === arrivalMessage?.sender_id
      ) {
        setMessages((prev) => [...prev, arrivalMessage]);
      }
    }
  }, [arrivalMessage]);

  // 每跳转到这个页面，就发送当前用户信息
  useEffect(() => {
    // 往客户端发接入的用户
    socket.current.emit("addUser", user.id);
    // 接受當前所有在綫的user
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // 每跳转到这个页面，就去获取该用户的所有conversation
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios(`${host}/api/conversations/${user.id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?.id]);

  // 获取当前会话的所有消息
  useEffect(() => {
    const getMessages = async (currentChat) => {
      try {
        const res = await axios(`${host}/api/message/${currentChat.id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChat) {
      getMessages(currentChat);
    }
  }, [currentChat]);

  // console.log(currentChat);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender_id: user.id,
      text: newMessage,
      conversation_id: currentChat.id,
    };

    const receiverId =
      currentChat.receiver_id !== user.id
        ? currentChat.receiver_id
        : currentChat.sender_id;

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`${host}/api/message`, message);
      // console.log(res.data);
      setMessages([...messages, ...res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

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
  }, 400);

  const createConversation = (u) => {
    axios
      .post(`${host}/api/conversations`, {
        receiverId: u.id,
      })
      .then((res) => {
        // 如果已经建立会话，则返回的是数组，数组元素是这个会话
        console.log(res.data);
        if (Array.isArray(res.data)) {
          setCurrentChat(res.data[0]);
          search.current.value = "";
          setUsers([]);
        } else {
          window.location.reload();
        }
      });
  };

  // // console.log(users);
  // console.log(conversations);
  // console.log(currentChat);

  return (
    <div>
      <Topbar />
      <div className="messenger">
        <div className="chat-menu">
          <div className="chat-menu-wrapper">
            <input
              placeholder="搜索朋友"
              className="chat-menu-input"
              ref={search}
              onChange={() => handleChange()}
            />
            <div
              className="search-users-for-chat"
              style={{ display: users.length ? "block" : "none" }}
            >
              {users.length &&
                users.map((u) => {
                  return (
                    <div className="chat-search-item" key={u.id}>
                      <img
                        className="chat-item-img"
                        src={
                          u?.profilePicture
                            ? PF + u?.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                        alt=""
                      />
                      <div className="chat-item-right">
                        <span className="user-name">{u.username}</span>
                        {u.id === user.id ? (
                          <div className="icon">这是你，不能和自己聊天</div>
                        ) : (
                          <div
                            className="icon"
                            onClick={() => createConversation(u)}
                          >
                            和他聊天
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            {conversations.length &&
              conversations.map((c) => {
                return (
                  <div key={c.id} onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={user} />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="chat-box">
          <div className="chat-box-wrapper">
            {currentChat ? (
              <>
                <div className="chat-box-top">
                  {messages.map((message) => {
                    return (
                      <div
                        ref={scrollRef}
                        key={message.id + message.text + message.createAt}
                      >
                        <Message
                          message={message}
                          own={message.sender_id === user.id}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="chat-box-bottom">
                  <textarea
                    className="chat-messenge-input"
                    placeholder="输入您的消息"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="chat-submit-button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    发送
                  </button>
                </div>
              </>
            ) : (
              <span className="no-conversation">打开一个会话以开始对话</span>
            )}
          </div>
        </div>
        <div className="chat-online">
          <div className="chat-online-wrapper">
            <Chatonline
              onlineUsers={onlineUsers}
              currentUser={user}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
