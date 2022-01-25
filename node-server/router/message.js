const Router = require("koa-router");

const { createMessage, getMessage } = require("../controller/message");

const { verifyAuth } = require("../middleware/auth-middleware");

const router = new Router({ prefix: "/api/message" });

// add a message
router.post("/", verifyAuth, createMessage);

// get a message
router.get("/:conversationId", verifyAuth, getMessage);

module.exports = router;
