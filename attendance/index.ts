import { InlineKeyboardMarkup } from "node-telegram-bot-api";
import type { ActionFunction } from "../action";
import { auth } from "../auth";
import { getAttendance } from "@dhu/core";
import { formatAttendance } from "./format";
import callbackAction from "./callback";

const inlineKeyboardAction: InlineKeyboardMarkup["inline_keyboard"] = [
  [{ text: "詳細を見る", callback_data: "showAttendanceDetail" }],
];

export const attendance: ActionFunction = async (bot, message, ctx) => {
  const { message_id } = await bot.sendMessage(message.chat.id, "Loading...");

  const res = await getAttendance(ctx);

  // send message
  await bot.editMessageText(formatAttendance(res), {
    chat_id: message.chat.id,
    message_id: message_id,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: inlineKeyboardAction,
    },
  });

  // callback message
  bot.on("callback_query", async (callbackQuery) => {
    if (
      callbackQuery.from.id == message.chat.id &&
      callbackQuery.message?.message_id == message_id
    ) {
      callbackAction(bot, callbackQuery, res);
    }
  });
};
