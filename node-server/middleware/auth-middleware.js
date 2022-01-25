const jwt = require("jsonwebtoken");
const { md5password } = require("../utils/password-handle");
const { PUBLIC_KEY } = require("../common/config");

const { check } = require("../service/auth-service");
const { getUserByEmail } = require("../service/user-service");

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
};

const verifyLogin = async (ctx, next) => {
  const { email, password } = ctx.request.body;
  // 判断是否输入邮箱与密码

  if (!email || !password) {
    ctx.response.status = 400;
    ctx.response.body = "邮箱与密码均不能为空";
    return;
  }

  const result = await getUserByEmail(email);
  if (result.length === 0) {
    ctx.response.status = 400;
    ctx.response.body = "不存在该用户";
    return;
  }

  const user = result[0];
  // console.log(user);
  const curPassword = user.password;

  const inputPassword = md5password(password);
  // console.log(curPassword, inputPassword);
  if (curPassword !== inputPassword) {
    ctx.response.status = 400;
    ctx.response.body = "密码不正确";
    return;
  }

  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  // 验证token
  console.log("验证登录、授权的middleware");

  // 这里的代码把token放到了cookie里
  const token = ctx.cookies.get("token");

  let result;
  try {
    result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
  } catch (err) {
    console.log(111);
    ctx.response.status = 401;
    ctx.response.body = "无效的用户！";
    return;
  }
  // console.log(result);
  // 判断id与要修改的id是否一致

  ctx.result = result;
  await next();
};

const verifyRefreshToken = async (ctx, next) => {
  const { token } = ctx.request.body;
  try {
    result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.response.status = 200;
    ctx.response.body = {
      isExpired: false,
      msg: "refreshToken有效",
    };
  } catch (err) {
    ctx.response.status = 401;
    ctx.response.body = {
      isExpired: true,
      msg: "refreshToken无效",
    };
  }
};

const verifyPermission = (tableName) => async (ctx, next) => {
  console.log("验证权限的middleware");
  // momentId对应的创建id
  // 当前id
  const { id } = ctx.result;
  const itemId = ctx.request.params[tableName + "Id"];

  // 有权限，才能修改
  const isPermission = await check(itemId, id, tableName);
  // console.log(isPermission);
  if (!isPermission) {
    ctx.response.status = 401;
    ctx.response.body = "不能修改别人的动态！";
    return;
  }

  await next();
};

module.exports = {
  handlePassword,
  verifyLogin,
  verifyAuth,
  verifyPermission,
  verifyRefreshToken,
};
