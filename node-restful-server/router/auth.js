const Router = require("koa-router");
const { handlePassword } = require("../middleware/auth-middleware");
const { createUser, login } = require("../controller/auth");
const { verifyLogin } = require("../middleware/auth-middleware");

const router = new Router({ prefix: "/api/auth" });
// 注册
router.post("/register", handlePassword, createUser);

//登录
router.post("/login", verifyLogin, login);

module.exports = router;
