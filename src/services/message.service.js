import prisma from "../../prisma/index.js";
import { getAIResponse } from "../utils/ollama.mjs";

const createMessage = async (userId, { content, threadId }) => {
  let thread;

  if (!threadId) {
    thread = await prisma.thread.create({
      data: {
        title: content.slice(0, 50),
        userId,
      },
    });
  } else {
    thread = await prisma.thread.findUnique({ where: { id: threadId } });
    if (!thread) throw new Error("Thread not found");
  }

  const userMessage = await prisma.message.create({
    data: {
      content,
      role: "user",
      threadId: thread.id,
    },
  });

  const pastMessages = await prisma.message.findMany({
    where: { threadId: thread.id },
    orderBy: { createdAt: "asc" },
  });

  const messagesForAI = pastMessages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const { fullContent, fullThought } = await getAIResponse(messagesForAI);

  const assistantMessage = await prisma.message.create({
    data: {
      content: fullContent,
      thought: fullThought,
      role: "assistant",
      threadId: thread.id,
    },
  });

  return {
    threadId: thread.id,
    messages: [userMessage, assistantMessage],
  };
};

const getMessagesByThreadId = async (threadId) => {
  return prisma.message.findMany({
    where: { threadId },
    orderBy: { createdAt: "asc" },
  });
};

export default { createMessage, getMessagesByThreadId };
