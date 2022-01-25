import React, { memo, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";

import { AuthContext } from "../../context/AuthContext";
import request from "../../service/request";

export default memo(function Feed(props) {
  // const { userId } = props;
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const [posts, setPosts] = useState([]);
  const currentId = +useParams().userId;

  const url = window.location.pathname;
  const isInProfilepage = url.startsWith("/profile");
  // console.log(useParams());
  // console.log(userId, currentId);
  // console.log(posts);
  useEffect(() => {
    if (isInProfilepage) {
      request.get(`/api/moment/timeline/all/${currentId}`).then((res) => {
        let posts = [...res.data.currentUserComments];
        posts.sort((p1, p2) => {
          return new Date(p2.createAt) - new Date(p1.createAt);
        });
        setPosts(posts);
      });
    } else {
      request.get(`/api/moment/timeline/all/${userId}`).then((res) => {
        let posts = [...res.data.currentUserComments];
        if (res.data.followersComments && !url.startsWith("/profile")) {
          posts.push(...res.data.followersComments);
        }
        // console.log(posts);
        // 對post排序
        // posts.push(...res.data.followersComments);
        posts.sort((p1, p2) => {
          return new Date(p2.createAt) - new Date(p1.createAt);
        });
        setPosts(posts);
      });
    }
  }, [userId, isInProfilepage, currentId]);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        {!currentId || currentId === userId ? <Share /> : ""}

        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
});
