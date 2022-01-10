import React, { memo, useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { PermMedia, Cancel } from "@mui/icons-material";

import { PF, host } from "../../config";

export default memo(function Profile() {
  const [user, setUser] = useState({});
  const [isShow, setIsShow] = useState(false);
  const { userId } = useParams();
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const description = useRef();
  const city = useRef();
  const hometown = useRef();
  const marry = useRef();

  const { user: currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${host}/api/users/${userId}`).then((res) => {
      // console.log(res);
      setUser(res.data);
    });
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      let data = new FormData();
      data.append("profile", file);
      await axios.post(`${host}/upload/profilePicture`, data);
    }

    if (file2) {
      let data = new FormData();
      data.append("cover", file2);
      console.log(data);
      await axios.post(`${host}/upload/cover`, data);
    }

    const newInfo = {};
    if (username.current.value !== "") {
      newInfo.username = username.current.value;
    }
    if (email.current.value !== "") {
      newInfo.email = email.current.value;
    }
    if (password.current.value !== "") {
      newInfo.password = password.current.value;
    }
    if (description.current.value !== "") {
      newInfo.description = description.current.value;
    }
    if (hometown.current.value !== "") {
      newInfo.hometown = hometown.current.value;
    }
    if (city.current.value !== "") {
      newInfo.city = city.current.value;
    }
    if (marry.current.value !== "") {
      newInfo.relationship = marry.current.value;
    }
    const res = await axios.put(`${host}/api/users/${currentUser.id}`, newInfo);

    dispatch({ type: "CHANGE_INFO", payload: res.data });
    setIsShow(!isShow);
    window.location.reload();
  };

  return (
    <div>
      <Topbar />
      <div className="profile-container">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img
                className="profile-cover-img"
                src={
                  user?.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profile-user-img"
                src={
                  user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name">{user?.username}</h4>
              <span className="profile-info-desc">{user?.description}</span>
            </div>
            {user.id === currentUser.id && (
              <div className="change-profile-info-btn-wrapper">
                <button
                  className="change-profile-info-btn"
                  onClick={() => setIsShow(!isShow)}
                >
                  修改个人信息
                </button>
              </div>
            )}
          </div>
          <div className="profile-right-bottom">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="change-profile-info"
              style={{
                display: isShow ? "flex" : "none",
                position: "fixed",
                left: 0,
                top: "200px",
                width: "15%",
              }}
            >
              <input
                className="change-item"
                type="text"
                placeholder="修改您的用户名"
                ref={username}
              />
              <input
                className="change-item"
                type="email"
                placeholder="修改您的邮箱"
                ref={email}
              />
              <input
                className="change-item"
                type="password"
                placeholder="修改您的密码"
                ref={password}
              />
              <textarea
                className="change-item"
                placeholder="修改您的个人描述"
                ref={description}
              />
              <input
                className="change-item"
                type="text"
                placeholder="修改您的城市"
                ref={city}
              />
              <input
                className="change-item"
                type="text"
                placeholder="修改您的家乡"
                ref={hometown}
              />
              <input
                className="change-item"
                type="text"
                placeholder="修改您的婚姻情况: 0是单身、1是结婚、2是未知"
                ref={marry}
              />
              <div>
                <label
                  htmlFor="file2"
                  className="file"
                  style={{ margin: "15px 0" }}
                >
                  <PermMedia htmlColor="tomato" />
                  <span className="share-option-text">头像</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file2"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
                {file && (
                  <div className="share-img-container">
                    <img
                      className="share-img"
                      alt="Share"
                      src={URL.createObjectURL(file)}
                    />
                    <Cancel
                      className="share-cancel-img"
                      onClick={() => setFile(null)}
                    />
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="file3"
                  className="file"
                  style={{ margin: "15px 0" }}
                >
                  <PermMedia htmlColor="tomato" />
                  <span className="share-option-text">背景配图</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file3"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile2(e.target.files[0])}
                  />
                </label>
                {file2 && (
                  <div className="share-img-container">
                    <img
                      className="share-img"
                      alt="Share"
                      src={URL.createObjectURL(file2)}
                    />
                    <Cancel
                      className="share-cancel-img"
                      onClick={() => setFile2(null)}
                    />
                  </div>
                )}
              </div>

              <button className="change-profile-info-btn" type="submit">
                提交修改
              </button>
            </form>
            <Feed />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
});
