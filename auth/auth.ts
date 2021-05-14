import type { ActionFunction } from "../action";
import {
  getUserInfo,
  setUserInfo,
  updateUserInfo,
  deleteUserInfo,
} from "../db";
import { ask } from "../utils";
import {
  USER_EXISTS,
  BAD_FORMAT,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "./result";
import { USER_NOT_EXISTS } from "./result";

export const login: ActionFunction = async (bot, message, ctx) => {
  const user = await getUserInfo(message.chat.id);

  if (user) {
    await bot.sendMessage(message.chat.id, USER_EXISTS.message);
    return;
  }

  const dhuId = await ask(bot, message.chat.id, "Type your dhu id.");
  const password = await ask(bot, message.chat.id, "Type your dhu password.");

  if (!dhuId || !password) {
    await bot.sendMessage(message.chat.id, BAD_FORMAT.message);
    return;
  }

  await setUserInfo({
    chat_id: message.chat.id,
    dhu_id: dhuId,
    password: password,
  });

  await bot.sendMessage(message.chat.id, LOGIN_SUCCESS.message);
};

export const logout: ActionFunction = async (bot, message) => {
  const user = await getUserInfo(message.chat.id);

  if (!user) {
    await bot.sendMessage(message.chat.id, USER_NOT_EXISTS.message);
    return;
  }

  await deleteUserInfo(user.uid);

  await bot.sendMessage(message.chat.id, LOGOUT_SUCCESS.message);
};

export const update: ActionFunction = async (bot, message) => {
  const user = await getUserInfo(message.chat.id);

  if (!user) {
    await bot.sendMessage(message.chat.id, USER_NOT_EXISTS.message);
    return;
  }

  const dhuId = await ask(bot, message.chat.id, "Type your dhu id.");
  const password = await ask(bot, message.chat.id, "Type your dhu password.");

  if (!dhuId || !password) {
    await bot.sendMessage(message.chat.id, BAD_FORMAT.message);
    return;
  }

  await updateUserInfo(message.chat.id, {
    chat_id: message.chat.id,
    dhu_id: dhuId,
    password: password,
  });

  await bot.sendMessage(message.chat.id, LOGOUT_SUCCESS.message);
};
