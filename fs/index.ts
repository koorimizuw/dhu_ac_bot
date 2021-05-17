import { getFS } from "@dhu/core";
import type { ActionFunction } from "../action";
import { formatFS } from "./format";

export const fs: ActionFunction = async (bot, message, ctx) => {
  if (!ctx) return;
  const { message_id } = await bot.sendMessage(message.chat.id, "Loading...");

  const res = await getFS(ctx);

  await bot.editMessageText(formatFS(res), {
    chat_id: message.chat.id,
    message_id: message_id,
    parse_mode: "HTML",
  });
};
