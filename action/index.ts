import TelegramBot, { Message } from "node-telegram-bot-api";
import { LoginContext } from "@dhu/core";
import { welcome } from "./welcome";
import { login, logout, update as updateInfo } from "../auth";
import { grade } from "../grade";
import { attendance } from "../attendance";
import { info } from "../info";
import { schedule } from "../schedule";
import { fs } from "../fs";

export type ActionFunction = (
  bot: TelegramBot,
  message: Message,
  ctx: LoginContext | null
) => Promise<void>;
type Actions = Map<string, ActionFunction>;

export const actions2 = {
  "123": login
}

export const actions: Actions = new Map(
  Object.entries({
    "/start": welcome,
    "/login": login,
    "/logout": logout,
    "/updateinfo": updateInfo,
    "/grade": grade,
    "/attendance": attendance,
    "/info": info,
    "/schedule": schedule,
    "/fs": fs
  })
);