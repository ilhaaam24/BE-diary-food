import messageService from "../services/message.service.js";
import { responseApiSuccess, responseApiFailed } from "../utils/responseApi.js";

const sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;
    const threadId = parseInt(req.params.threadId);

    const message = await messageService.createMessage(userId, {
      content,
      threadId,
    });

    responseApiSuccess(res, "Message sent", message);
  } catch (err) {
    console.error(err);
    responseApiFailed(res, "Failed to send message");
  }
};

const sendFirstMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;

    const message = await messageService.createMessage(userId, { content });

    responseApiSuccess(res, "Message and new thread created", message);
  } catch (err) {
    console.error(err);
    responseApiFailed(res, "Failed to send first message");
  }
};

const getMessagesByThread = async (req, res) => {
  try {
    const threadId = parseInt(req.params.threadId);
    const messages = await messageService.getMessagesByThreadId(threadId);
    responseApiSuccess(res, "Success get messages", messages);
  } catch (err) {
    console.error(err);
    responseApiFailed(res, "Failed get messages");
  }
};

export default { sendMessage, sendFirstMessage, getMessagesByThread };
