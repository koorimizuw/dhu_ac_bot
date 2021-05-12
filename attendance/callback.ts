import TelegramBot, {
  CallbackQuery,
  InlineKeyboardMarkup,
} from "node-telegram-bot-api";
import { Attendance } from "@dhu/core";
import { formatAttendance, formatAttendanceDetail } from "./format";

const inlineKeyboardAction = (
  data: Attendance[]
): InlineKeyboardMarkup["inline_keyboard"] => {
  return data.map((item) => {
    return [
      {
        text: item.title,
        callback_data: item.code,
      },
    ];
  });
};

export default async (
  bot: TelegramBot,
  cq: CallbackQuery,
  data: Attendance[]
) => {
  if (!cq.data) {
    return;
  }
  switch (cq.data) {
    case "showAttendanceDetail":
      const inline: InlineKeyboardMarkup = {
        inline_keyboard: inlineKeyboardAction(data),
      };
      await bot.editMessageText(formatAttendance(data), {
        chat_id: cq.from.id,
        message_id: cq.message?.message_id,
        parse_mode: "HTML",
        reply_markup: inline,
      });
      break;
    default:
      bot.sendMessage(cq.from.id, formatAttendanceDetail(data, cq.data), {
        parse_mode: "HTML",
      });
  }
};
