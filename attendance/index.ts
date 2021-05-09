import { getAttendance } from "@dhu/core";
import { LoginContext } from "@dhu/core/dist/login";
import TelegramBot from "node-telegram-bot-api";
import formatAttendance from "./format";
import attendanceCallBackMessage from "./callback";

export const attendance = async (
  bot: TelegramBot,
  id: number,
  ctx: LoginContext
) => {
  const { message_id } = await bot.sendMessage(id, "Loading...");
  const res = await getAttendance(ctx);
  console.log(res);
  await bot.editMessageText(formatAttendance(res), {
    chat_id: id,
    message_id: message_id,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: "詳細を見る", callback_data: "showAttendanceDetail" }],
      ],
    },
  });

 attendanceCallBackMessage(bot, id, message_id, res);
};
