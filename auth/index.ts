import { getUserInfo } from "../db";
import { login as dhuLogin, Browser } from "@dhu/core";

export { login, logout, update } from "./auth";

type Await<T> = T extends PromiseLike<infer U> ? U : T;
type LoginContext = Await<ReturnType<typeof dhuLogin>>["data"];

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
