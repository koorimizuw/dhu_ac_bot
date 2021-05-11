import type { ActionFunction } from ".";
import { welcomeMessage } from "./message";

export const welcome: ActionFunction = async (bot, message) => {
  await bot.sendMessage(message.chat.id, welcomeMessage, {
    parse_mode: "HTML",
  });
};
