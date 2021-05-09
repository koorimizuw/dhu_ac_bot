import { login, update as updateInfo, auth } from "./auth";
import { welcome } from "./action";
import { grade } from "./grade";
import TelegramBot from "node-telegram-bot-api";

require("dotenv").config();
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });
const action = async (message: TelegramBot.Message) => {
  const { from, chat, text } = message;
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
      const res = await auth(chat.id);
      if (!res || !res.data) {
        bot.sendMessage(chat.id, "Authenticate failed.");
        break;
      }
      switch (text) {
        case "/grade":
          grade(bot, chat.id, res.data);
          break;
      }
  }
};

bot.on("message", action);
