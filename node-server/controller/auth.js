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
const { PRIVATE_KEY } = require("../common/config");

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

  async login(ctx, next) {
    const { id, username } = ctx.user;
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 60 * 24 * 1000 * 365,
      algorithm: "RS256",
    });

    // const { username } = ctx.request.body;

    // 把token放到cookie里的测试
    ctx.cookies.set("token", token);
    // , {
    //   maxAge: 60 * 60 * 24 * 365,
    // }
    const result = await getUserById(id);
    const followings = await getPeopleYouFollowsById(id);
    result.followings = followings;
    ctx.response.body = result;
  }

  async update(ctx, next) {
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
    const { id } = ctx.result;

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
    const id = ctx.params.id;
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
