import TelegramBot, { Message } from "node-telegram-bot-api";
import { Browser, LoginContext } from "@dhu/core";
import { auth, authActions } from "../auth";

type Result = {
  error: boolean;
  ctx: LoginContext | null;
};

const PASS: Result = {
  error: false,
  ctx: null,
};

const ERROR: Result = {
  error: true,
  ctx: null,
};

const inMaintenance = () => {
  const date = new Date();
  const h = date.getHours();
  if (h >= 3 && h <= 5) {
    return true;
  }
  return false;
};

export default async (
  bot: TelegramBot,
  message: Message,
  browser: Browser
): Promise<Result> => {
  // in maintenance
  if (inMaintenance()) {
    bot.sendMessage(message.chat.id, "Maintenance time.");
    return ERROR;
  }
  // authenticate
  if (authActions.includes(message.text as string)) {
    const ctx = await auth(browser, message.chat.id);
    if (!ctx) {
      bot.sendMessage(message.chat.id, "Authenticate failed.");
      return ERROR;
    }
    return {
      error: false,
      ctx: ctx,
    };
  }

  return PASS;
};
