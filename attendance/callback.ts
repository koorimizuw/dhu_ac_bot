import TelegramBot, { Message } from "node-telegram-bot-api";
import { Attendance, AttendanceRecord } from "@dhu/core";
import { formatAttendance, formatAttendanceDetail } from "./format";

export default (
  bot: TelegramBot,
  chatId: number,
  msgId: number,
  data: Attendance[]
) => {
  bot.on("callback_query", async (message) => {
    if (message.from.id == chatId && message.message?.message_id == msgId) {
      if (!message.data) {
        return;
      }
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
            chat_id: chatId,
            message_id: msgId,
            parse_mode: "HTML",
            reply_markup: inline,
          });
          break;
        default:
          bot.sendMessage(chatId, formatAttendanceDetail(data, message.data), {
            parse_mode: "HTML",
          });
          console.log(message);
      }
    }
  });
};
