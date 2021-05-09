import { getUserInfo } from "../db";
import { login as dhuLogin, Browser } from "@dhu/core";

export { login, logout, update } from "./auth";

export const auth = async (browser: Browser, id: number) => {
  const user = await getUserInfo(id);
  if (!user) {
    return;
  }
  return dhuLogin(browser, {
    id: user.dhu_id,
    password: user.password,
  });
};
