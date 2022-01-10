const Router = require("koa-router");

const { createMessage, getMessage } = require("../controller/message");

const { verifyAuthForFollow } = require("../middleware/auth-middleware");

const router = new Router({ prefix: "/api/message" });

// add a message
router.post("/", verifyAuthForFollow, createMessage);

// get a message
router.get("/:conversationId", verifyAuthForFollow, getMessage);

module.exports = router;
