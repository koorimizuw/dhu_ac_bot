import dotenv from "dotenv";
dotenv.config();
import { login, update as updateInfo, auth } from "./auth";
import { welcome } from "./action";
import { grade } from "./grade";
import { attendance } from "./attendance";
import TelegramBot from "node-telegram-bot-api";
import { chromium } from "@dhu/core";

const token = process.env.TOKEN;

async function start() {
  // create bot
  const bot = new TelegramBot(token, { polling: true });
  // start background browser
  const browser = await chromium.launch();

  const action = async (message: TelegramBot.Message) => {
    const { from: _, chat, text } = message;
    switch (text) {
      case "/start":
        welcome(bot, chat.id);
        break;
      case "/login":
        const loginResult = await login(bot, chat.id);
        bot.sendMessage(chat.id, loginResult.message);
        break;
      case "/updateinfo":
        const updateInfoResult = await updateInfo(bot, chat.id);
        bot.sendMessage(chat.id, updateInfoResult.message);
        break;
      default:
        const res = await auth(browser, chat.id);
        if (!res || !res.data) {
          bot.sendMessage(chat.id, "Authenticate failed.");
          break;
        }
        switch (text) {
          case "/grade":
            grade(bot, chat.id, res.data);
            break;
          case "/attendance":
            attendance(bot, chat.id, res.data);
            break;
        }
    }
  };

  bot.on("message", action);
}

start();
