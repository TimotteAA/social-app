const connections = require("../common/database");

// 修改删除内容用的数据库：动态、评论、
class AuthService {
  // 查询动态
  async check(id, userId, tableName) {
    // 表名不写死
    const statement = `SELECT * FROM ${tableName} WHERE id = ? and user_id = ?;`;
    const [result] = await connections.execute(statement, [id, userId]);
    // console.log(result);
    if (!result.length) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = new AuthService();
