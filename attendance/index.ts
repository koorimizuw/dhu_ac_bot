import { CallbackQuery } from "node-telegram-bot-api";
import { getAttendance } from "@dhu/core";
import type { ActionFunction } from "../action";
import { encodeCallbackData } from "../callback";
import { formatAttendance } from "./format";
import { callbackAction } from "./callback";

export const attendance: ActionFunction = async (bot, message, ctx) => {
  if (!ctx) return;
  const { message_id } = await bot.sendMessage(message.chat.id, "Loading...");

  const res = await getAttendance(ctx);
  const callbackData = encodeCallbackData({
    name: "showAtteDetail",
    data: {},
  });

  // send message
  await bot.editMessageText(formatAttendance(res), {
    chat_id: message.chat.id,
    message_id: message_id,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "詳細を見る",
            callback_data: callbackData,
          },
        ],
      ],
    },
  });

  // receive callback
  const handler = async (query: CallbackQuery) => {
    if (
      query.from.id == message.chat.id &&
      query.message?.message_id == message_id
    ) {
      callbackAction(bot, query, res);
    }
    setTimeout(() => {
      bot.removeListener("callback_query", handler)
    }, 300 * 1000)
  }

  bot.on("callback_query", handler);
};
