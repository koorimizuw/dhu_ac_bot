import { getUserInfo } from "../db";
import { login as dhuLogin, Browser, LoginContext } from "@dhu/core";

export { login, logout, update } from "./auth";

export const authActions = ["/grade", "/attendance"];

export const auth = async (
  browser: Browser,
  id: number
): Promise<LoginContext | null> => {
  const user = await getUserInfo(id);
  if (!user) return null;

  const res = await dhuLogin(browser, {
    id: user.dhu_id,
    password: user.password,
  });

  if (!res?.data || res?.error) return null;

  return res.data;
};
