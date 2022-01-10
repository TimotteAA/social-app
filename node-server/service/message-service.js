const connections = require("../common/database");

class MessageService {
  async create(conversation_id, sender_id, text) {
    const statement = `
    INSERT INTO  message (conversation_id, sender_id, text) VALUES (?, ?, ?); 
    `;

    const [result] = await connections.execute(statement, [
      conversation_id,
      sender_id,
      text,
    ]);

    return result;
  }

  async getMessages(conversationId) {
    const statement = `
        SELECT * FROM message WHERE conversation_id = ?
      `;
    const [result] = await connections.execute(statement, [conversationId]);

    return result;
  }

  async getMessageByMessageId(id) {
    const statement = `
        SELECT * FROM message WHERE id = ?;
      `;

    const [result] = await connections.execute(statement, [id]);

    return result;
  }
}

module.exports = new MessageService();
