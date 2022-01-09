const connections = require("../common/database");

class FileService {
  async createAvatarInfo(mimetype, filename, size, userId) {
    const statement = `
      INSERT INTO avatar (mimetype, filename, size, user_id) VALUES (?, ?, ?, ?);
    `;

    const [result] = await connections.execute(statement, [
      mimetype,
      filename,
      size,
      userId,
    ]);

    // 将url插入users表中
    const statement2 = `
    UPDATE users SET profilePicture = ? WHERE id = ?;`;

    const [result2] = await connections.execute(statement2, [
      "person/" + filename,
      userId,
    ]);
    return result;
  }

  // async updateAvatarUrlByUserId(userId, avatarUrl) {
  //   // const statement = `
  //   //   UPDATE users SET avatar_url = ? WHERE id = ?;
  //   // `;
  //   const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`;

  //   const [result] = await connections.execute(statement, [avatarUrl, userId]);
  // }

  // 插入动态的配图信息
  async createPictureInfo(mimetype, filename, size, userId, momentId) {
    const statement = `
      INSERT INTO picture (mimetype, filename, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);
    `;

    const [result] = await connections.execute(statement, [
      mimetype,
      filename,
      size,
      userId,
      momentId,
    ]);

    // 網表中插入圖片的url
    const statement2 = `
        UPDATE moment SET img_url = ? WHERE id = ?;
    `;

    const [result2] = await connections.execute(statement2, [
      "post/" + filename,
      momentId,
    ]);
    return result;
  }

  async createCoverInfo(mimetype, filename, size, userId) {
    const statement = `
      INSERT INTO cover (mimetype, filename, size, user_id) VALUES (?, ?, ?, ?);
    `; 

    const [result] = await connections.execute(statement, [
      mimetype,
      filename,
      size,
      userId,
    ]);

    // 将url插入users表中
    const statement2 = `
    UPDATE users SET coverPicture = ? WHERE id = ?;`;

    const [result2] = await connections.execute(statement2, [
      "cover/" + filename,
      userId,
    ]);
    return result;
  }

  async getPictureInfo(filename) {
    const statement = `
      SELECT * FROM picture WHERE filename = ?;
    `;

    const [result] = await connections.execute(statement, [filename]);
    return result[0];
  }
}

module.exports = new FileService();
