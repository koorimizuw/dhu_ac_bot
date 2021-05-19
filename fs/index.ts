import { CallbackQuery } from "node-telegram-bot-api";
import { getFS, sleep } from "@dhu/core";
import type { ActionFunction } from "../action";
import { encodeCallbackData } from "../callback";
import { formatFS } from "./format";
import { callbackAction } from "./callback"

export const fs: ActionFunction = async (bot, message, ctx) => {
  if (!ctx) return;
  const { message_id } = await bot.sendMessage(message.chat.id, "Loading...");

  const res = await getFS(ctx);


  const callbackData = encodeCallbackData({
    name: "fillFS",
    data: {},
  });

  await bot.editMessageText(formatFS(res), {
    chat_id: message.chat.id,
    message_id: message_id,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "フィードバックを回答する",
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
      callbackAction(bot, query, res, ctx);
    }
    setTimeout(() => {
      bot.removeListener("callback_query", handler)
    }, 300 * 1000)
  }

  bot.on("callback_query", handler);
  await sleep(300 * 1000)
};
