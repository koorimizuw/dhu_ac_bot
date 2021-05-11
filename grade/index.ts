import type { ActionFunction } from "../action";
import { auth } from "../auth";
import { getGPA } from "@dhu/core";
import formatGPA from "./format";

export const grade: ActionFunction = async (bot, message, browser) => {
  const ctx = await auth(browser, message.chat.id);
  if (!ctx) {
    bot.sendMessage(message.chat.id, "Authenticate failed.");
    return;
  }

  const { message_id } = await bot.sendMessage(message.chat.id, "Loading...");

  const res = await getGPA(ctx);

  await bot.editMessageText(formatGPA(res), {
    chat_id: message.chat.id,
    message_id: message_id,
    parse_mode: "HTML",
  });
};
