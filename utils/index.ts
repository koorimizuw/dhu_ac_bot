import TelegramBot, { Message, CallbackQuery } from "node-telegram-bot-api";

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

export const choose = async (
  bot: TelegramBot,
  id: number,
  q: string,
  c: string[]
): Promise<Message["text"]> => {
  const { message_id } = await bot.sendMessage(id, q, {
    reply_markup: {
      force_reply: true,
      inline_keyboard: c.map((v, i) => {
        return [{
          text: v,
          callback_data: String(i)
        }]
      })
    },
  });

  return new Promise((resolve) => {
    const handler = (query: CallbackQuery) => {
      if (query.message?.message_id !== message_id) return;
      bot.removeListener("callback_query", handler);
      resolve(query.data);
    };

    bot.on("callback_query", handler);
  });
};