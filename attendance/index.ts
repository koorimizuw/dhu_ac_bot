import type { ActionFunction } from "../action";
import { auth } from "../auth";
import { getAttendance } from "@dhu/core";
import { formatAttendance } from "./format";
import attendanceCallBackMessage from "./callback";

export const attendance: ActionFunction = async (bot, message, browser) => {
  const ctx = await auth(browser, message.chat.id);
  if (!ctx) {
    bot.sendMessage(message.chat.id, "Authenticate failed.");
    return;
  }

  const { message_id } = await bot.sendMessage(message.chat.id, "Loading...");

  const res = await getAttendance(ctx);

  console.log("%j", res);
  await bot.editMessageText(formatAttendance(res), {
    chat_id: message.chat.id,
    message_id: message_id,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: "詳細を見る", callback_data: "showAttendanceDetail" }],
      ],
    },
  });

  attendanceCallBackMessage(bot, message.chat.id, message_id, res);
};
