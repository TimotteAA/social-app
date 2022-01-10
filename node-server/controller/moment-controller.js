const path = require("path");
const fs = require("fs");

const { getFollowersId } = require("../service/user-service");
const {
  create,
  // getMomentById,
  upadteMoment,
  removeMoment,
  getMoment,
  getCurrentUserMoment,
  getMomentList,
  hasLabel,
  addLabels,
  getMomentLabels,
  getMomentPicturesById,
  hasLiked,
  likeMoment,
  dislikeMoment,
} = require("../service/moment-service");

// const { getPictureInfo } = require("../service/file-service");

class MomentController {
  async create(ctx, next) {
    // 把评论放到数据库里
    // 1. 获取user_id与content，图片
    const { id } = ctx.result;
    const { content } = ctx.request.body;
    // console.log(id, content);
    // 2. 将评论插入数据库

    const [result] = await create(id, content);
    // console.log(result);
    ctx.response.body = result;
  }

  async detail(ctx, next) {
    // console.log("获取评论详情的中间件");
    // 1. 获取动态id(momentId)
    const momentId = ctx.request.params.momentId;
    // console.log(momentId);

    // 2. 根据momentId去数据库查询
    const [result] = await getMomentById(momentId);

    ctx.response.body = result[0];
  }

  // 获取多个评论：分页查询

  async list(ctx, next) {
    const { offset, limit } = ctx.request.query;

    // 2. 分页查询
    try {
      const [result] = await getMomentList(offset, limit);
      // console.log(result);
      ctx.response.body = result;
    } catch (err) {
      console.log(err.message);
    }
  }

  async update(ctx, next) {
    // 1.获取id
    const { momentId } = ctx.request.params;
    const { content } = ctx.request.body;
    const { id } = ctx.result; // 登录用户id
    // 2. 修改动态

    const result = await upadteMoment(content, momentId);
    // console.log(result);
    ctx.response.body = result;
  }

  async deleteMoment(ctx, next) {
    //   获取momentId
    // 去数据库删
    const { momentId } = ctx.request.params;
    const result = await removeMoment(momentId);
    ctx.response.body = result;
  }

  async addLabels(ctx, next) {
    // 1.获取moment_id与要插入的标签
    const { labels } = ctx;
    const { momentId } = ctx.request.params;

    // console.log(labels, momentId);

    // 2. 添加所有标签
    for (let label of labels) {
      // 2.1 判断标签是否已经与动态有过关系
      const isExist = await hasLabel(momentId, label.id);

      if (!isExist) {
        // 没有存在这条关系，插入表中
        const result = await addLabels(momentId, label.id);
      }
    }

    ctx.response.body = "给动态添加标签成功";
  }

  async getMomentLabels(ctx, next) {
    const { momentId } = ctx.request.params;
    // console.log(momentId);
    const result = await getMomentLabels(momentId);
    ctx.response.body = result;
  }

  async getMomentPictures(ctx, next) {
    const { momentId } = ctx.request.params;
    const result = await getMomentPicturesById(momentId);

    ctx.response.body = result;
  }

  async getFile(ctx, next) {
    const { filename } = ctx.request.params;
    const file = await getPictureInfo(filename);

    const baseUrl = "./uploads/picture/";
    ctx.response.set("Content-Type", file.mimetype);
    ctx.response.body = fs.createReadStream(
      path.resolve(baseUrl, file.filename)
    );
  }

  async changeLike(ctx, next) {
    const moment_id = ctx.request.params.momentId;
    // console.log(moment_id);
    const { id } = ctx.result;

    const [result] = await hasLiked(moment_id, id);

    if (!result) {
      // 没有like，like
      await likeMoment(moment_id, id);
      ctx.response.body = "你已like这条moment";
      return;
    }

    await dislikeMoment(moment_id, id);
    ctx.response.body = "你已dislike这条moment";
  }

  async getMomentById(ctx, next) {
    const { momentId } = ctx.request.params;
    const result = await getMoment(momentId);

    ctx.response.body = result;
  }

  async getAllComments(ctx, next) {
    const { userId } = ctx.request.params;
    const result = await getCurrentUserMoment(userId);

    // 得到follow当前用户的数组
    const followers = await getFollowersId(userId);

    const timelineComments = {};
    timelineComments.currentUserComments = result;

    // console.log(followers);
    if (followers && followers.length) {
      timelineComments.followersComments = [];
      for (let follower of followers) {
        // console.log(follower.id);
        const tmp = await getCurrentUserMoment(follower.follower_id);
        timelineComments.followersComments.push(...tmp);
      }
    }

    ctx.response.body = timelineComments;
  }
}

module.exports = new MomentController();
