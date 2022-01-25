const jwt = require("jsonwebtoken");
const {
  create,
  updateUser,
  getUserById,
  deleteUser,
  hasFollowed,
  createFollower,
  deleteFollower,
  getPeopleYouFollowsById,
  getFollowersId,
  searchUser,
} = require("../service/user-service");
const { md5password } = require("../utils/password-handle");
const { PUBLIC_KEY, PRIVATE_KEY } = require("../common/config");

let refreshTokens = [];

class UserController {
  async createUser(ctx, next) {
    const { username, password, email } = ctx.request.body;

    try {
      const res = await create(username, password, email);
      ctx.response.body = res;
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = "服务器错误";
    }
  }

  async logout(ctx, next) {
    const { refreshToken } = ctx.request.body;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    console.log(refreshTokens);
    ctx.response.body = "退出成功";
  }

  async refreshToken(ctx, next) {
    const refreshToken = ctx.request.body.token;
    const { id, username } = ctx.request.body;

    // send error if there is no token or it's invalid
    if (!refreshToken) {
      ctx.response.status = 401;
      ctx.response.body = "没有携带token";
    }

    if (!refreshTokens.includes(refreshToken)) {
      console.log(refreshTokens);
      ctx.response.status = 403;
      ctx.response.body = "Refresh token is not valid";
      return;
    }

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: "30s",
      algorithm: "RS256",
    });

    const newRefreshToken = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: "30 days",
      algorithm: "RS256",
    });

    refreshTokens.push(newRefreshToken);

    ctx.cookies.set("token", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      // overwrite: true,
    });
    console.log(refreshTokens, 222);
    const result = await getUserById(id);
    const followings = await getPeopleYouFollowsById(id);
    result.followings = followings;
    ctx.response.body = { ...result, refreshToken: newRefreshToken };
    // 删除原有的两个token，生成新的token
  }

  async login(ctx, next) {
    const { id, username } = ctx.user;
    const accessToken = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: "30s",
      algorithm: "RS256",
    });

    ctx.cookies.set("token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      // overwrite: true,
    });

    const refreshToken = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: "30 days",
      algorithm: "RS256",
    });

    const result = await getUserById(id);
    const followings = await getPeopleYouFollowsById(id);
    refreshTokens.push(refreshToken);
    console.log(refreshTokens);
    result.followings = followings;
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.response.body = { ...result, refreshToken: refreshToken };
  }

  async update(ctx, next) {
    const { id } = ctx.result;
    // console.log(result.id, ctx.request.params.id);
    if (id !== +ctx.request.params.id) {
      ctx.response.status = 401;
      ctx.response.body = "不能修改、删除它人的账户！";
      return;
    }

    let {
      username,
      email,
      password,
      description,
      city,
      hometown,
      relationship,
    } = ctx.request.body;
    console.log(
      username,
      email,
      password,
      description,
      city,
      hometown,
      relationship
    );

    try {
      if (username) {
        await updateUser(id, "username", username);
      }
      if (email) {
        await updateUser(id, "email", email);
      }
      if (password) {
        password = md5password(password);
        await updateUser(id, "password", password);
      }
      if (description) {
        await updateUser(id, "description", description);
      }
      if (city) {
        await updateUser(id, "city", city);
      }
      if (hometown) {
        await updateUser(id, "hometown", hometown);
      }
      if (relationship) {
        await updateUser(id, "relationship", relationship);
      }
    } catch (err) {
      // console.log(111);
      ctx.response.status = 500;
      ctx.response.body = err;
      return;
    }

    try {
      const user = await getUserById(id);
      ctx.response.body = user;
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = err;
      return;
    }
  }

  async deleteUserCon(ctx, next) {
    const { id } = result;
    // console.log(result.id, ctx.request.params.id);
    if (id !== +ctx.request.params.id) {
      ctx.response.status = 401;
      ctx.response.body = "不能修改、删除它人的账户！";
      return;
    }

    try {
      const result = await deleteUser(id);
      ctx.response.body = result;
    } catch (err) {
      ctx.reponse.status = 500;
      ctx.response.body = err;
    }
  }

  async getUserById(ctx, next) {
    const userId = ctx.params.id;
    try {
      const user = await getUserById(userId);
      const followings = await getPeopleYouFollowsById(userId);
      user.followings = followings;
      ctx.response.body = user;
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = err;
      return;
    }
  }

  async follow(ctx, next) {
    const { id } = ctx.result;
    const followedId = ctx.request.params.id;
    // console.log(ctx.request.params);
    // console.log(id, followedId);
    if (Number(id) !== Number(followedId)) {
      // 如果已经follow过，则报错
      const hasFollowedRes = await hasFollowed(followedId, id);
      if (!hasFollowedRes.length) {
        const result = await createFollower(followedId, id);
        // const result = await getPeopleYouFollowsById(id);
        ctx.response.body = result;
      } else {
        ctx.response.status = 403;
        ctx.response.body = "你已经关注过该用户";
      }
    } else {
      ctx.response.status = 403;
      ctx.response.body = "你不能follow你自己";
    }
  }

  async unfollow(ctx, next) {
    const { id } = ctx.result;
    const followedId = ctx.request.params.id;
    // console.log(ctx.request.params);
    // console.log(id, followedId);
    if (Number(id) !== Number(followedId)) {
      // 如果已经follow过，则报错
      const hasFollowedRes = await hasFollowed(followedId, id);
      // console.log(hasFollowedRes);
      if (!hasFollowedRes.length) {
        ctx.response.status = 403;
        ctx.response.body = "你没有关注该用户";
      } else {
        const result = await deleteFollower(followedId, id);
        ctx.response.body = result;
      }
    } else {
      ctx.response.status = 403;
      ctx.response.body = "你不能unfollow你自己";
    }
  }

  // 得到id所有的关注者
  async getFriends(ctx, next) {
    const { userId } = ctx.request.params;
    // console.log(userId);
    const result = await getFollowersId(userId);

    const followers = [];
    if (result.length && result[0].follower_id !== null) {
      for (let t of result) {
        const _t = await getUserById(t.follower_id);
        followers.push(_t);
      }
    }
    // console.log(followers);
    // console.log(followers);
    ctx.response.body = followers;
  }

  async search(ctx, next) {
    const { username } = ctx.request.params;
    // console.log(username);
    const result = await searchUser(username);

    ctx.response.body = result;
  }
}

module.exports = new UserController();
