const Router = require("koa-router");

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.response.body = "Welcome to homepage";
});

module.exports = router;
