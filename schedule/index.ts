import { saveGoogleCalendarCSV } from "@dhu/core";
import type { ActionFunction } from "../action";


export const schedule: ActionFunction = async (bot, message, ctx) => {
  if (!ctx) return;
  await bot.sendMessage(message.chat.id, "Loading...");

  const res = await saveGoogleCalendarCSV(ctx);

  bot.sendDocument(message.chat.id, Buffer.from(res), {}, {
    filename: "schedule.csv",
    contentType: "text/csv"
  });
};
