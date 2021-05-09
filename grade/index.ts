import { getGPA } from "@dhu/core";
import formatGPA from "./format";
import { LoginContext } from "@dhu/core/dist/login";
import TelegramBot from "node-telegram-bot-api";

export const grade = async (
  bot: TelegramBot,
  id: number,
  ctx: LoginContext
) => {
  const { message_id } = await bot.sendMessage(id, "Loading...");
  const res = await getGPA(ctx);
  await bot.editMessageText(formatGPA(res), {
    chat_id: id,
    message_id: message_id,
    parse_mode: "HTML",
  });
};
