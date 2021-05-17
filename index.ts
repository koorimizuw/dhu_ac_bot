import dotenv from "dotenv";
dotenv.config();
import TelegramBot from "node-telegram-bot-api";
import { getContext } from "./middleware";
import { chromium } from "@dhu/core";
import { actions } from "./action";

const token = process.env.TOKEN;

async function start() {
  // create bot
  const bot = new TelegramBot(token, { polling: true });
  // start background browser
  const browser = await chromium.launch();

  // action
  bot.on("message", async (message) => {
    const ctx = await getContext(bot, message.chat.id, browser);
    await actions.get(message.text as string)?.(bot, message, ctx);
    await ctx?.ctx.close()
  });
}

start();
