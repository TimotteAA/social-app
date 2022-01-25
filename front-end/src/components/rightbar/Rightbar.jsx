import React, { memo, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./rightbar.css";
import { Add, Remove } from "@mui/icons-material";

import Online from "../online/Online";
import { AuthContext } from "../../context/AuthContext";

import { PF } from "../../config";
import request from "../../service/request";

const mapping = new Map();
mapping.set(0, "单身").set(1, "结婚了").set(2, "未知");

export default memo(function Rightbar(props) {
  // user: 正在查看的profile裏的user
  const { user } = props;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  // console.log(user, currentUser);
  // console.log(currentUser);
  const [followed, setFollowed] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let res = currentUser?.followings.filter(
      (follower) => follower.id === user?.id
    );
    // console.log(res);
    setFollowed(res?.length > 0);
  }, [currentUser, user?.id]);
  // console.log(followed);
  useEffect(() => {
    request.get(`/api/users/friends/${user?.id}`).then((res) => {
      setFriends(res.data);
    });
  }, [user?.id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await request.delete(`/api/users/${user.id}/unfollow`);
        dispatch({ type: "UNFOLLOW", payload: { id: user?.id } });
        window.location.reload();
      } else {
        await request.put(`/api/users/${user.id}/follow`);
        dispatch({ type: "FOLLOW", payload: { id: user?.id } });
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthday-container"></div>
        <img className="right-bar-ad" alt="" src={PF + "/ad.png"} />
        {/* <h4 className="rightbar-title">Online Friends</h4>
        <ul className="rightbar-friend-list">
          {Users.map((user) => {
            return <Online user={user} />;
          })}
        </ul> */}
        <div className="right-bar-more-ad">广告位待租！</div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <div>
        {user?.id !== currentUser?.id ? (
          <button
            className="rightbar-follow-button"
            onClick={(e) => handleClick()}
          >
            {followed ? <Remove /> : <Add />}
            {/* Follow */}
          </button>
        ) : (
          ""
        )}
        <h4 className="rightbar-title">User information</h4>
        <div className="rightbar-info">
          <div className="right-info-item">
            <span className="rightbar-info-key">City:</span>
            <span className="rightbar-info-value">{user.city}</span>
          </div>
          <div className="right-info-item">
            <span className="rightbar-info-key">From:</span>
            <span className="rightbar-info-value">{user.hometown}</span>
          </div>
          <div className="right-info-item">
            <span className="rightbar-info-key">Relationship:</span>
            <span className="rightbar-info-value">
              {mapping.get(user.relationship)}
            </span>
          </div>
        </div>
        <h4 className="rightbar-title">User friends</h4>
        <div className="rightbar-followings">
          {friends.length &&
            friends.map((friend) => {
              // console.log(friend);
              // console.log(friend.profilePicture);
              // console.log(`${PF}/${friend.profilePicture}`);
              const profileUrl = `${PF}/${friend.profilePicture}`;
              return (
                <Link
                  to={`/profile/${friend.id}`}
                  key={friend.id}
                  style={{ textDecoration: "none" }}
                >
                  <div className="rightbar-following">
                    <img
                      className="rightbar-folloing-img"
                      src={
                        friend.profilePicture
                          ? profileUrl
                          : PF + "/person/noAvatar.png"
                      }
                      alt=""
                    />
                    <span className="rightbar-following-name">
                      {friend.username}
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
});
