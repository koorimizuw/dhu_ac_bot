import TelegramBot from "node-telegram-bot-api";
import { Browser, LoginContext } from "@dhu/core";
import { auth } from "../auth";

export const getContext = async (
  bot: TelegramBot,
  chatId: number,
  browser: Browser
): Promise<LoginContext | null> => {
  const ctx = await auth(browser, chatId);
  if (!ctx) {
    bot.sendMessage(
      chatId,
      "Authenticate failed or in maintenance."
    );
  }
  return ctx
}
