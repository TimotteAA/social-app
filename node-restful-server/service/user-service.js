const connections = require("../common/database");
const mapParamVaraibleToString = [];

class UserService {
  async create(username, password, email) {
    const statement = `INSERT INTO users (username, password, email) VALUES (?, ?, ?);`;

    let result;
    try {
      [result] = await connections.execute(statement, [
        username,
        password,
        email,
      ]);
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  async getUserByEmail(email) {
    const statement = `SELECT u.id, u.password
    FROM users as u WHERE email = ?;`;
    const result = await connections.execute(statement, [email]);

    return result[0];
  }

  async getUserById(id) {
    const statement = `SELECT u.id, u.username, u.isAdmin, 
    u.description, u.city, u.hometown, u.relationship, u.createAt, u.updateAt,
    u.profilePicture as profilePicture, u.coverPicture as coverPicture,
    JSON_ARRAYAGG(JSON_OBJECT("id", fs.follower_id)) as followers
    FROM users as u 
    LEFT JOIN followers as fs
    ON u.id = fs.user_id
    WHERE u.id = ?;`;
    const [result] = await connections.execute(statement, [id]);

    return result[0];
  }

  async updateUser(id, paramKey, param) {
    const statement = `UPDATE users SET ${paramKey}=? WHERE id = ?;`;
    const [result] = await connections.execute(statement, [param, id]);
    return result;
  }

  async deleteUser(id) {
    const statement = `DELETE FROM users WHERE id = ?;`;
    const [result] = await connections.execute(statement, [id]);
    return result;
  }

  async hasFollowed(userId, followerId) {
    // user_id是被followed，而follower_id是跟随者的id
    const statement = `SELECT * FROM followers WHERE user_id = ? and follower_id = ?`;
    console.log(userId, followerId);
    const [result] = await connections.execute(statement, [userId, followerId]);
    console.log(result);
    return result;
  }

  async createFollower(userId, followerId) {
    const statement = `INSERT INTO followers (user_id, follower_id) VALUES (?, ?)`;

    const [result] = await connections.execute(statement, [userId, followerId]);

    return result;
  }

  async deleteFollower(userId, followerId) {
    const statement = `DELETE FROM followers WHERE user_id = ? and follower_id = ?`;

    const [result] = await connections.execute(statement, [userId, followerId]);
    return result;
  }

  // 查询你当前关注了谁
  async getPeopleYouFollowsById(id) {
    //   const statement = `SELECT f.follower_id as id, JSON_ARRAYAGG(JSON_OBJECT("id", u.id, "username", u.username, "email", u.email, "desc", u.description,"city", u.city, "hometown", u.hometown, "relationship", u.relationship)) as peopleYouFollowed
    //   FROM followers as f
    //   RIGHT JOIN users as u ON f.user_id = u.id
    //   WHERE f.follower_id = ?;`;

    const statement = `
      SELECT f.user_id as id
      FROM followers as f
      WHERE f.follower_id = ?;
    `;

    const [result] = await connections.execute(statement, [id]);
    return result;
  }

  async getFollowersId(userId) {
    const statement = `SELECT f.follower_id FROM followers as f WHERE user_id = ?;`;
    const [result] = await connections.execute(statement, [userId]);

    return result;
  }
}

module.exports = new UserService();
