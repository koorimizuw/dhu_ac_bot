import TelegramBot from "node-telegram-bot-api";
import { Attendance } from "@dhu/core";
import formatAttendance from "./format";

export default async (
  bot: TelegramBot,
  chatID: number,
  msgId: number,
  data: Attendance[]
) => {
  await bot.on("callback_query", async (message) => {
    if (message.from.id == chatID && message.message?.message_id == msgId) {
      switch (message.data) {
        case "showAttendanceDetail":
          const inline: TelegramBot.InlineKeyboardMarkup = {
            inline_keyboard: data.map((item) => {
              return [
                {
                  text: item.title,
                  callback_data: item.code,
                },
              ];
            }),
          };
          await bot.editMessageText(formatAttendance(data), {
            chat_id: chatID,
            message_id: msgId,
            parse_mode: "HTML",
            reply_markup: inline,
          });
        default:
          console.log(message);
      }
    }
  });
};
