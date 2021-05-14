import TelegramBot, { Message } from "node-telegram-bot-api";

export const ask = async (
  bot: TelegramBot,
  id: number,
  q: string
): Promise<Message["text"]> => {
  const { message_id } = await bot.sendMessage(id, q, {
    reply_markup: { force_reply: true },
  });

  return new Promise((resolve) => {
    const handler = (message: Message) => {
      if (message.reply_to_message?.message_id !== message_id) return;
      bot.removeListener("text", handler);
      resolve(message.text);
    };

    bot.on("text", handler);
  });
};