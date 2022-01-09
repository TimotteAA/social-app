import React, { memo, useState, useEffect, useContext } from "react";
import "./post.css";
// import { useLocation } from "react-router-dom";
import { MoreVert, WindowRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

import { PF, host } from "../../config";

export default memo(function Post(props) {
  const { post } = props;
  // console.log(post);
  // const user = Users.filter((u) => u.id === post.userId);

  const { user: currentUser } = useContext(AuthContext);
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState({});
  const [userWhoLike, setUserWhoLike] = useState([]);
  const [like, setLike] = useState(userWhoLike.length);
  const [likeMessage, setLikeMessage] = useState("");

  // console.log(post);

  useEffect(() => {
    axios.get(`${host}/api/users/${post.user_id}`).then((res) => {
      setUser(res.data);
    });
    axios.get(`${host}/api/moment/${post.id}`).then((res) => {
      // console.log(res.data);
      // console.log(res.data[0].peopleLiked);
      if (res.data[0].peopleLiked[0].id !== null) {
        // 点赞了
        // console.log(res.data[0].peopleLiked);
        setUserWhoLike(res.data[0].peopleLiked);
        setLike(res.data[0].peopleLiked.length);
      } else {
        setLike(like > 1 ? like - 1 : 0);
      }
    });
  }, [likeMessage, post.user_id, post.id]);

  useEffect(() => {});

  const likeHandle = () => {
    try {
      axios.put(`${host}/api/moment/${post.id}/like`).then((res) => {
        // console.log(res.data);
        setLikeMessage(res.data);
      });
    } catch (err) {}
  };

  const handleDelete = () => {
    // console.log("監聽到了刪除事件");
    axios.delete(`${host}/api/moment/${post.id}`).then((res) => {
      // console.log(res);
      window.location.reload();
    });
  };

  return (
    <div className="post">
      <div className="post-wrapper">
        <div class="top">
          <div className="top-left">
            <Link to={`/profile/${post.user_id}`}>
              <img
                className="post-profile-img"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="post-username">{user.username}</span>
            <span className="post-date">{format(post.createAt)}</span>
          </div>
          {post.user_id === currentUser.id && (
            <div className="top-right" onClick={() => handleDelete()}>
              Delete
              <MoreVert />
            </div>
          )}
        </div>
        <div class="center">
          <span className="post-text">{post?.content}</span>
          <img className="post-img" src={PF + post.img_url} alt="" />
        </div>
        <div class="bottom">
          <div className="post-bottom-left">
            <img
              className="like-icon"
              src={PF + "/like.png"}
              alt=""
              onClick={(e) => likeHandle()}
            />
            <img
              className="like-icon"
              src={PF + "/heart.png"}
              alt=""
              onClick={(e) => likeHandle()}
            />
            <span className="post-like-counter">{like} people like it</span>
          </div>
          {/* <div className="post-bottom-right">
            <span className="post-comment-text">{post.comment} comments</span>
          </div> */}
        </div>
      </div>
    </div>
  );
});
