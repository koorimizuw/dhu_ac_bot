import dotenv from "dotenv";
dotenv.config();
import TelegramBot from "node-telegram-bot-api";
import middleware from "./middleware";
import { chromium, LoginContext } from "@dhu/core";
import { actions } from "./action";

const token = process.env.TOKEN;

async function start() {
  // create bot
  const bot = new TelegramBot(token, { polling: true });
  // start background browser
  const browser = await chromium.launch();

  bot.on("message", async (message) => {
    if (!message.text) return;
    const res = await middleware(bot, message, browser);
    if (res.error) return;
    actions.get(message.text)?.(bot, message, res.ctx as LoginContext);
  });
}

start();
