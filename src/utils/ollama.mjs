import ollama from "ollama";

export async function getAIResponse(messages) {
  const stream = await ollama.chat({
    model: "gemma3:1b",
    messages,
    stream: true,
  });

  let fullContent = "";
  let fullThought = "";
  let outputMode = "think";

  for await (const part of stream) {
    const msg = part.message.content;

    if (outputMode === "think") {
      if (!msg.includes("<think>") && !msg.includes("</think>")) {
        fullThought += msg;
      }

      if (msg.includes("</think>")) {
        outputMode = "response";
      }
    } else {
      fullContent += msg;
    }
  }

  return { fullContent, fullThought };
}
