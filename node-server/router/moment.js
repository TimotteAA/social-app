const Router = require("koa-router");

const momentRouter = new Router({ prefix: "/api/moment" });

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth-middleware");
const {
  create,
  detail,
  update,
  deleteMoment,
  changeLike,
  getMomentById,
  getAllComments,
  //   list,
  //   addLabels,
  //   getMomentLabels,
  //   getMomentPictures,
  //   getFile,
} = require("../controller/moment-controller");

// const { verifyLabelExists } = require("../middleware/label-middleware.js");

// 发表评论：先登录，因此验证token，然后再create
momentRouter.post("/", verifyAuth, create);

// 获取某条动态详情，包括动态的评论列表
// momentRouter.get("/:momentId", detail);

// 修改动态内容
// 修改哪条moment
// 1.验证登录（授权） -> verifyAuth
// 2.是否是发布动态的本身
// 3.修改
momentRouter.put("/:momentId", verifyAuth, verifyPermission("moment"), update);
// 删除某条动态：中间件类似
momentRouter.delete(
  "/:momentId",
  verifyAuth,
  verifyPermission("moment"),
  deleteMoment
);

// like、unlike某条动态
// 可以点赞自己的动态
momentRouter.put("/:momentId/like", verifyAuth, changeLike);

// get a moment
momentRouter.get("/:momentId", getMomentById);

// get timeline moments
momentRouter.get("/timeline/all/:userId", getAllComments);

// // 获取多条动态，其中还包括评论的数量
// momentRouter.get("/", list);

// // 给某条动态添加标签的接口
// // 登陆后，并且是给自己的动态添加标签
// // 插入中间表moment_label时，需要label的id
// // 因此verifyLabelExists中间件除了要把没有在表中的标签创建出来
// // 还要把label的id给到下一个中间件
// momentRouter.post(
//   "/:momentId/labels",
//   verifyAuth,
//   verifyPermission("moment"),
//   verifyLabelExists,
//   addLabels
// );

// 获取单条动态的所有标签
// momentRouter.get("/labels/:momentId", getMomentLabels);

// 获取单条动态的所有配图信息
// momentRouter.get("/:momentId/pictures", verifyAuth, getMomentPictures);

// 依据配图名，得到单张配图
// momentRouter.get("/images/:filename", getFile);

module.exports = momentRouter;
