import { getUserInfo } from "../db";
import { login as dhuLogin } from "@dhu/core";

export { login, update } from "./login";

export const auth = async (id: number) => {
  const user = await getUserInfo(id);
  if (!user) {
    return;
  }
  return await dhuLogin({
    id: user.dhu_id,
    password: user.password,
  });
};
