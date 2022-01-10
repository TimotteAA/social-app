const {
  create,
  getMessages,
  getMessageByMessageId,
} = require("../service/message-service");

class MessageController {
  async createMessage(ctx, next) {
    const { conversation_id, sender_id, text } = ctx.request.body;
    try {
      const result = await create(conversation_id, sender_id, text);
      const newMessage = await getMessageByMessageId(result.insertId);
      ctx.response.body = newMessage;
    } catch (err) {
      ctx.status = 500;
      ctx.response.body = err.message;
    }
  }

  async getMessage(ctx, next) {
    const { conversationId } = ctx.request.params;

    try {
      const result = await getMessages(conversationId);
      ctx.response.body = result;
    } catch (err) {
      ctx.status = 500;
      ctx.response.body = err.message;
    }
  }
}
module.exports = new MessageController();
