const Router = require("koa-router");
const { handlePassword } = require("../middleware/auth-middleware");
const {
  createUser,
  login,
  logout,
  refreshToken,
} = require("../controller/auth");
const {
  verifyLogin,
  verifyRefreshToken,
} = require("../middleware/auth-middleware");

const router = new Router({ prefix: "/api/auth" });
// 注册
router.post("/register", handlePassword, createUser);

//登录
router.post("/login", verifyLogin, login);

// 退出
router.post("/logout", logout);

// 验证refreshToken是否过期
router.post("/verifyRefresh", verifyRefreshToken);

// 刷新token
router.post("/refresh", refreshToken);

module.exports = router;
