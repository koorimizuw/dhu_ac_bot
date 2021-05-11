import dotenv from "dotenv";
dotenv.config();
import TelegramBot from "node-telegram-bot-api";
import { chromium } from "@dhu/core";
import { actions } from "./action";

const token = process.env.TOKEN;

async function start() {
  // create bot
  const bot = new TelegramBot(token, { polling: true });
  // start background browser
  const browser = await chromium.launch();

  bot.on("message", (message) => {
    if (!message.text) return;
    actions.get(message.text)?.(bot, message, browser);
  });
}

start();
