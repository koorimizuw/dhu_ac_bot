import { CallbackQuery } from "node-telegram-bot-api";
import { getInfo, GetInfoOptions } from "@dhu/core";
import type { ActionFunction } from "../action";
import { encodeCallbackData } from "../callback";
import { formatInfo } from "./format";
import { callbackAction } from "./callback"

export const info: ActionFunction = async (bot, message, ctx) => {
  if (!ctx) return;
  const { message_id } = await bot.sendMessage(message.chat.id, "Loading...");

  const options: GetInfoOptions = {
    listAll: false,
    attachments: { download: false },
  };

  const callbackData = encodeCallbackData({
    name: "showInfoDetail",
    data: {},
  });

  const res = await getInfo(ctx, options);
  console.log(res)

  await bot.editMessageText(formatInfo(res), {
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
      callbackAction(bot, query, res, ctx);
    }
    setTimeout(() => {
      bot.removeListener("callback_query", handler)
    }, 300 * 1000)
  }

  bot.on("callback_query", handler);
};
