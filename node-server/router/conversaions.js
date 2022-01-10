const Router = require("koa-router");
const {
  createConversation,
  getConversation,
  getConversationOfTwoUsers,
} = require("../controller/conversation");

const { verifyAuthForFollow } = require("../middleware/auth-middleware");

const router = new Router({ prefix: "/api/conversations" });

// new conv
router.post("/", verifyAuthForFollow, createConversation);

// get conv of a user
router.get("/:userId", verifyAuthForFollow, getConversation);

// get conv of two users
router.get(
  "/find/:firstUserId/:secondUserId",
  verifyAuthForFollow,
  getConversationOfTwoUsers
);

module.exports = router;
