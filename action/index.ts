import TelegramBot, { Message } from "node-telegram-bot-api";
import { ChromiumBrowser } from "@dhu/core";
import { welcome } from "./welcome";
import { login, logout, update as updateInfo } from "../auth";
import { grade } from "../grade";
import { attendance } from "../attendance";

export type ActionFunction = (
  bot: TelegramBot,
  message: Message,
  browser: ChromiumBrowser
) => Promise<void>;
type Actions = Map<string, ActionFunction>;

export const actions: Actions = new Map(
  Object.entries({
    "/start": welcome,
    "/login": login,
    "/logout": logout,
    "/updateinfo": updateInfo,
    "/grade": grade,
    "/attendance": attendance,
  })
);

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
