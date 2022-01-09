const Router = require("koa-router");

const router = new Router({ prefix: "/test" });
// 注册
router.get("/", (ctx, next) => {
  ctx.cookies.set(
    "token",
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjQxMzU5NjkyLCJleHAiOjE4OTM4MDEzNTk2OTJ9.cNv6HLyUKxfhSluffUSWO8O6u2PzgVsua9BbRscJTN-Fturfr7VyaEZusBf5CBHFhoUBlWNoS4ERZ_d_SL361K1xz35NBnJBnh-Cf7bn96lj9rVavk9KLmq4ppbVXexRsMxexC79I4ftnNB6azw_2oca2w9t8NHYdU3RT8Euu5s; path=/; expires=Wed, 05 Jan 2022 14:00:28 GMT; httponly"
  );
});

module.exports = router;
