import threadService from "../services/thread.service.js";
import { responseApiSuccess, responseApiFailed } from "../utils/responseApi.js";

const getThreads = async (req, res) => {
  try {
    const userId = req.user.id;

    const threads = await threadService.getThreadsByUser(userId);
    responseApiSuccess(res, "Success get threads", threads);
  } catch (err) {
    responseApiFailed(res, "Failed get threads");
  }
};

const getThread = async (req, res) => {
  try {
    const threadId = parseInt(req.params.threadId);

    const thread = await threadService.getThreadById(threadId);
    responseApiSuccess(res, "Success get thread", thread);
  } catch (err) {
    responseApiFailed(res, "Failed get thread");
  }
};

const deleteThread = async (req, res) => {
  try {
    const threadId = parseInt(req.params.threadId);

    const thread = await threadService.deleteThreadById(threadId);
    responseApiSuccess(res, "Thread deleted", thread);
  } catch (err) {
    responseApiFailed(res, "Failed delete thread");
  }
};

export default { getThreads, getThread, deleteThread };
