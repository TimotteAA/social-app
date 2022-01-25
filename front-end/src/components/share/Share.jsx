import React, { memo, useContext, useRef, useState } from "react";
import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";

import request from "../../service/request";
import { PF } from "../../config";

export default memo(function Share() {
  const { user, dispatch } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const submitHandler = (e) => {
    e.preventDefault();
    const newPost = {
      content: desc.current.value,
    };
    // console.log(newPost);
    let data;
    if (file) {
      data = new FormData();
      data.append("file", file);
    }

    try {
      request.post(`/api/moment`, newPost).then((res) => {
        const momentId = res.data.insertId;
        // console.log(momentId);
        if (file) {
          request.post(`/upload/picture/${momentId}`, data).then((res) => {
            // console.log(res);
            window.location.reload();
          });
        }
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        window.location.reload();
      });

      //
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img
            src={
              user?.profilePicture
                ? PF + user?.profilePicture
                : PF + "/person/noAvatar.png"
            }
            alt=""
            className="share-profile-img"
          />
          <input
            placeholder={user.username + "，您此刻的心情？"}
            className="share-input"
            ref={desc}
          />
        </div>
        <hr className="share-hr" />
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
        <form className="share-bottom" onSubmit={(e) => submitHandler(e)}>
          <div className="share-options">
            <label htmlFor="file" className="share-option">
              <PermMedia className="share-icon" htmlColor="tomato" />
              <span className="share-option-text">Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            {/* <div className="share-option">
              <Label className="share-icon" htmlColor="tomato" />
              <span className="share-option-text">Tag</span>
            </div>
            <div className="share-option">
              <Room className="share-icon" htmlColor="tomato" />
              <span className="share-option-text">Location</span>
            </div>
            <div className="share-option">
              <EmojiEmotions className="share-icon" htmlColor="tomato" />
              <span className="share-option-text">Feelings</span>
            </div> */}
          </div>
          <button type="submit" className="share-btn">
            分享
          </button>
        </form>
      </div>
    </div>
  );
});
