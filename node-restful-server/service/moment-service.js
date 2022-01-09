const path = require("path");
const connections = require("../common/database");

class MomentService {
  async create(userId, content) {
    const statement = `
        INSERT INTO moment (user_id, content) VALUES (?, ?)`;
    const result = connections.execute(statement, [userId, content]);
    return result;
  }

  // 评论信息也要获得
  // async getMomentById(id) {
  //   const statement = `    SELECT m.id as id, m.content as content,
  //   JSON_OBJECT('id', u.id, 'name', u.name) as user,
  // 	JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createAt', c.createAt,
  // 	'user', JSON_OBJECT('id', cu.id, 'name', cu.name)
  // 	)) as comments
  //   FROM moment as m
  // 	LEFT JOIN users as u ON m.user_id = u.id
  //   LEFT JOIN comment as c ON c.moment_id = m.id
  // 	LEFT JOIN users as cu ON c.user_id = cu.id
  // 	WHERE m.id = ?;`;
  //   // 返回的数据应该包含user的数据
  //   const result = connections.execute(statement, [id]);
  //   return result;
  // }

  async getMomentList(offset, limit) {
    const statement = `
    SELECT moment.id as id, moment.content as content, moment.createAt as createAt, moment.updateAt as updateAt,
    JSON_OBJECT("id", users.id, 'name', users.name) user, 
	  (SELECT COUNT(*) FROM comment WHERE comment.moment_id = moment.id) as commentCount,
	  (SELECT COUNT(*) FROM moment_label WHERE moment_label.moment_id = moment.id) as labelCount
    FROM moment 
    LEFT JOIN users ON moment.user_id = users.id
    LIMIT ?, ? ;
    `;
    const result = await connections.execute(statement, [offset, limit]);
    // console.log(result);
    return result;
  }

  async upadteMoment(content, momentId) {
    // 修改动态
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const result = await connections.execute(statement, [content, momentId]);
    return result;
  }

  async removeMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`;
    const [result] = await connections.execute(statement, [momentId]);
    return result;
  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`;

    const [result] = await connections.execute(statement, [momentId, labelId]);

    return result[0] ? true : false;
  }

  async addLabels(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)`;

    const [result] = await connections.execute(statement, [momentId, labelId]);
    return result;
  }

  async getMomentLabels(momentId) {
    const statement = `SELECT m.id as id, m.createAt as createAt, m.updateAt as updateAt,
    JSON_ARRAYAGG(
      JSON_OBJECT('id', l.id, 'name', l.name)
    ) as labels
    FROM moment as m 
    LEFT JOIN moment_label as ml
    ON m.id = ml.moment_id
    LEFT JOIN label as l
    ON ml.label_id = l.id
    WHERE m.id = ?`;

    const [result] = await connections.execute(statement, [momentId]);
    return result;
  }

  async getMomentPicturesById(momentId) {
    // 去picture表中获得所有信息
    const statement = `SELECT pic.id as id, pic.filename as filename, pic.mimetype as mimetype 
    FROM picture as pic WHERE moment_id = ?;`;
    const [result] = await connections.execute(statement, [momentId]);
    return result;
  }

  async hasLiked(momentId, userId) {
    // console.log(momentId, userId);
    const statement = `SELECT * FROM moment_likes WHERE moment_id = ? and user_id = ?`;

    const [result] = await connections.execute(statement, [momentId, userId]);

    // console.log(result);
    return result;
  }

  async likeMoment(momentId, userId) {
    const statement = `INSERT INTO moment_likes (moment_id, user_id) VALUES (?, ?)`;
    const [result] = await connections.execute(statement, [
      Number(momentId),
      Number(userId),
    ]);

    return result;
  }

  async dislikeMoment(momentId, userId) {
    const statement = `DELETE FROM moment_likes WHERE moment_id = ? and user_id = ?`;
    const [result] = await connections.execute(statement, [momentId, userId]);

    return result;
  }

  async getMoment(momentId) {
    const statement = `SELECT m.id as id, m.user_id as user_id, m.content as content, 
    m.img_url as imgUrl, m.createAt as createAt, m.updateAt as updateAt,
    JSON_ARRAYAGG(JSON_OBJECT("id", u.id, "username", u.username, "email", u.email, "desc", u.description,"city", u.city, "hometown", u.hometown, "relationship", u.relationship)) as peopleLiked
    FROM moment as m 
    LEFT JOIN moment_likes as ml
    ON m.id = ml.moment_id 
    LEFT JOIN users as u
    on ml.user_id = u.id
    WHERE m.id = ?;`;

    const [result] = await connections.execute(statement, [momentId]);
    return result;
  }

  async getCurrentUserMoment(userId) {
    const statement = `SELECT m.id as id, m.user_id as user_id, m.content as content, m.img_url as img_url, m.createAt as createAt, m.updateAt as updateAt 
    , (SELECT COUNT(*) FROM moment_likes WHERE moment_id = m.id) as likes
    FROM moment as m
        WHERE m.user_id = ?;`;
    const [result] = await connections.execute(statement, [userId]);

    return result;
  }

  // async getCurrentMomentLikst(moment_id) {
  //   const statement = `SELECT * FROM moment_likes WHERE moment_id = ?;`;
  //   const [result] = await connections.execute(statement, [moment_id]);

  //   return result;
  // }
}

module.exports = new MomentService();
