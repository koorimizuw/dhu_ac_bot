import type { ActionFunction } from "../action";
import { getGPA } from "@dhu/core";
import { formatGPA } from "./format";

export const grade: ActionFunction = async (bot, message, ctx) => {
  if (!ctx) return;
  const { message_id } = await bot.sendMessage(message.chat.id, "Loading...");

  const res = await getGPA(ctx);

  await bot.editMessageText(formatGPA(res), {
    chat_id: message.chat.id,
    message_id: message_id,
    parse_mode: "HTML",
  });
};
