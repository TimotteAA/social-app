const Router = require("koa-router");
const {
  createConversation,
  getConversation,
  getConversationOfTwoUsers,
} = require("../controller/conversation");

const { verifyAuth } = require("../middleware/auth-middleware");

const router = new Router({ prefix: "/api/conversations" });

// new conv
router.post("/", verifyAuth, createConversation);

// get conv of a user
router.get("/:userId", verifyAuth, getConversation);

// get conv of two users
router.get(
  "/find/:firstUserId/:secondUserId",
  verifyAuth,
  getConversationOfTwoUsers
);

module.exports = router;
