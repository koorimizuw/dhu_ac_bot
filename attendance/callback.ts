import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import { Attendance } from "@dhu/core";
import { encodeCallbackData, decodeCallbackData } from "../callback"
import { formatAttendance, formatAttendanceDetail } from "./format";

export const callbackAction = async (bot: TelegramBot, query: CallbackQuery, data: Attendance[]) => {
  const action = decodeCallbackData(query.data as string)

  switch (action.name) {
    case "showAtteDetail":
      await bot.editMessageText(formatAttendance(data), {
        chat_id: query.from.id,
        message_id: query.message?.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: data.map((item) => {
            return [
              {
                text: item.title.split(/[【\[]/)[0].trim(),
                callback_data: encodeCallbackData({
                  name: "showAtteSubject",
                  data: { code: item.code },
                }),
              },
            ];
          })
        },
      });
      break;
    case "showAtteSubject":
      bot.sendMessage(query.from.id, formatAttendanceDetail(data, action.data.code), {
        parse_mode: "HTML",
      });
  }
};
