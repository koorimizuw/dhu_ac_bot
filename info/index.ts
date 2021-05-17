import { CallbackQuery } from "node-telegram-bot-api";
import { getInfo, getInfoItemByIndex, sleep } from "@dhu/core";
import type { ActionFunction } from "../action";
import { encodeCallbackData } from "../callback";
import { formatInfo } from "./format";
//import { callbackAction } from "./callback"

export const info: ActionFunction = async (bot, message, ctx) => {
  if (!ctx) return;
  const { message_id } = await bot.sendMessage(message.chat.id, "Loading...");

  const options = {
    all: false,
    attachments: false,
    dir: "",
  };

  const callbackData = encodeCallbackData({
    name: "showInfoDetail",
    data: {},
  });

  const res = await getInfo(ctx, options);
  console.log(res)

  const res2 = await getInfoItemByIndex(ctx.page, 0, { content: true, dir: "" })
  console.log(res2)

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


};
