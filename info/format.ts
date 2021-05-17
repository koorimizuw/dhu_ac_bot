import { Info } from "@dhu/core";

export const formatInfo = (info: Info[]) => {
  let str = "<b>掲示板</b>: \n\n";
  for (let i of info) {
    str += i.title
    str += "\n";
  }
  return str;
};