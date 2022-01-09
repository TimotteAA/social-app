const {
  createAvatarInfo,
  createPictureInfo,
  createCoverInfo,
} = require("../service/file-service");

// const { updateAvatarUrlByUserId } = require("../service/login-service");

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { mimetype, filename, size } = ctx.req.file;
    const { id } = ctx.result;
    console.log(ctx.req.file, id);

    // 2.将图像信息数据保存到一张表中
    try {
      const result = await createAvatarInfo(mimetype, filename, size, id);
    } catch (err) {
      console.log(err.message);
    }

    // // 3.将图片地址保存在users表中
    // // 本地
    // // const avatar = `http://localhost:8000/uploads/users/${id}/avatar/`;
    // const avatar = `http://139.196.224.17:8000/uploads/users/${id}/avatar/`;
    // // console.log(avatarUrl);
    // await updateAvatarUrlByUserId(avatar, id);

    // 3.返回结果
    ctx.response.body = "上传头像成功成功";
  }

  async savePictureInfo(ctx, next) {
    const { id } = ctx.result;
    const { momentId } = ctx.request.params;
    const file = ctx.req.file;
    const { filename, mimetype, size } = file;
    // console.log(mimetype, filename, size, id, momentId);
    try {
      await createPictureInfo(mimetype, filename, size, id, momentId);
    } catch (err) {
      console.log(err.message);
    }

    // 将所有的文件信息保存到数据库中
    // console.log(222);
    ctx.response.body = "上传动态配图成功";
  }

  async saveCoverInfo(ctx, next) {
    const { id } = ctx.result;
    const { mimetype, filename, size } = ctx.req.file;

    // 2.将图像信息数据保存到一张表中
    try {
      const result = await createCoverInfo(mimetype, filename, size, id);
    } catch (err) {
      console.log(err.message);
    }
    // 3.返回结果
    ctx.response.body = "上传配图成功";
  }
}

module.exports = new FileController();
