const {
  createService,
  getConversationByUserId,
  getConversationByTwoUsers,
} = require("../service/conversation-sevice");

class ConversationController {
  async createConversation(ctx, next) {
    const { id } = ctx.result;
    const { receiverId } = ctx.request.body;

    try {
      const result = await createService(id, receiverId);
      ctx.response.body = result;
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = "error";
    }
  }

  async getConversation(ctx, next) {
    const { userId } = ctx.request.params;

    try {
      const result = await getConversationByUserId(userId);
      ctx.response.body = result;
    } catch (err) {
      ctx.response.body = "err";
    }
  }

  async getConversationOfTwoUsers(ctx, next) {
    const { firstUserId, secondUserId } = ctx.request.params;

    try {
      const [result] = await getConversationByTwoUsers(
        firstUserId,
        secondUserId
      );

      ctx.body = result;
    } catch (err) {
      ctx.response.body = err;
    }
  }
}

module.exports = new ConversationController();
