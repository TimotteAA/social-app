const connections = require("../common/database");

class ConversationService {
  async createService(id, receiverId) {
    const statement = `
    INSERT INTO conversation (receiver_id, sender_id) VALUES (?, ?); 
    `;

    const [result] = await connections.execute(statement, [receiverId, id]);

    return result;
  }

  async getConversationByUserId(userId) {
    const statement1 = `
        SELECT * FROM conversation as c WHERE c.receiver_id = ?;
    `;
    const statement2 = `
        SELECT * FROM conversation as c WHERE c.sender_id = ?;
    `;

    const [res1] = await connections.execute(statement1, [userId]);
    const [res2] = await connections.execute(statement2, [userId]);

    return [...res1, ...res2];
  }

  async getConversationByTwoUsers(firstUserId, secondUserId) {
    const statement = `
      SELECT * FROM conversation as c WHERE (c.receiver_id = ? and c.sender_id = ?) or (c.receiver_id = ? and c.sender_id = ?); 
    `;

    const [result] = await connections.execute(statement, [
      firstUserId,
      secondUserId,
      secondUserId,
      firstUserId,
    ]);

    return result;
  }
}

module.exports = new ConversationService();
