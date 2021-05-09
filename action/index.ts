import { sleep } from "@dhu/core";
import TelegramBot from "node-telegram-bot-api";
import { welcomMessage } from "./message";

export const welcome = (bot: TelegramBot, id: number) => {
  bot.sendMessage(id, welcomMessage, { parse_mode: "HTML" });
};

export const ask = async (bot: TelegramBot, id: number, q: string) => {
  const { message_id } = await bot.sendMessage(id, q, {
    reply_markup: { force_reply: true },
  });

  let value: string | undefined = "";
  bot.on("text", (message) => {
    if (message.reply_to_message?.message_id == message_id)
      value = message.text;
  });

  while (!value) {
    await sleep(1);
  }

  return value;
};
