const Router = require("koa-router");
const {
  verifyAuth,
  verifyAuthForFollow,
} = require("../middleware/auth-middleware");
const {
  update,
  deleteUserCon,
  getUserById,
  follow,
  unfollow,
  getFriends,
  search,
} = require("../controller/auth");
const router = new Router({ prefix: "/api/users" });

// update user
// 先看userId是否存在
router.put("/:id", verifyAuth, update);

// delate a user
// 只能删自己的账户
router.delete("/:id", verifyAuth, deleteUserCon);

// get a user
router.get("/:id", getUserById);

// follow a user
router.put("/:id/follow", verifyAuthForFollow, follow);

// unfollow a user
router.delete("/:id/unfollow", verifyAuthForFollow, unfollow);

// 得到一个user的friends
router.get("/friends/:userId", getFriends);

// 搜索某个用户
router.get("/search/:username", verifyAuthForFollow, search);

module.exports = router;
