import { getUserInfo, setUserInfo, updateUserInfo } from "../db";
import { ask } from "../action";
import TelegramBot from "node-telegram-bot-api";
import { Result, USER_EXISTS, BAD_FORMAT, LOGIN_SUCCESS } from "./result";
import { USER_NOT_EXISTS } from "./result";

export const login = async (bot: TelegramBot, id: number): Promise<Result> => {
  const user = await getUserInfo(id);

  if (user) {
    return USER_EXISTS;
  }

  const dhuId = await ask(bot, id, "Type your dhu id.");
  const password = await ask(bot, id, "Type your dhu password.");

  if (!dhuId || !password) {
    return BAD_FORMAT;
  }

  await setUserInfo({
    chat_id: id,
    dhu_id: dhuId,
    password: password,
  });

  return LOGIN_SUCCESS;
};

export const update = async (bot: TelegramBot, id: number): Promise<Result> => {
  const user = await getUserInfo(id);

  if (!user) {
    return USER_NOT_EXISTS;
  }

  const dhuId = await ask(bot, id, "Type your dhu id.");
  const password = await ask(bot, id, "Type your dhu password.");

  if (!dhuId || !password) {
    return BAD_FORMAT;
  }

  await updateUserInfo(id, {
    chat_id: id,
    dhu_id: dhuId,
    password: password,
  });

  return LOGIN_SUCCESS;
};
