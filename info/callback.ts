import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import { LoginContext, Info, getInfoItemByIndex } from "@dhu/core";
import { encodeCallbackData, decodeCallbackData } from "../callback"
import { formatInfo, formatInfoItem } from "./format";

export const callbackAction = async (bot: TelegramBot, query: CallbackQuery, data: Info[], ctx: LoginContext) => {
  const action = decodeCallbackData(query.data as string)

  switch (action.name) {
    case "showInfoDetail":
      await bot.editMessageText(formatInfo(data), {
        chat_id: query.from.id,
        message_id: query.message?.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: data.map((item, index) => {
            return [
              {
                text: item.title || "",
                callback_data: encodeCallbackData({
                  name: "showInfoItem",
                  data: { index },
                }),
              },
            ];
          })
        },
      });
      break;
    case "showInfoItem":
      const infoItem = await getInfoItemByIndex(ctx.page, action.data.index, {
        navigate: true,
        content: true,
        attachments: { download: false },
      })
      console.log(infoItem.content)
      await bot.sendMessage(query.from.id, formatInfoItem(infoItem), {
        parse_mode: "HTML"
      })
    default:
      break;
  }
};
