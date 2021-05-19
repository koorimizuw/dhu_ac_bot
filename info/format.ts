import { Info } from "@dhu/core";

export const formatInfo = (info: Info[]) => {
  let str = "<b>掲示板</b>: \n\n";
  for (let i of info) {
    str += i.title
    str += "\n";
  }
  return str;
};

export const formatInfoItem = (item: Info) => {
  let str = `<b>${item.title}</b>: \n\n`;
  str += `差出人: ${item.sender}\n`
  str += `カテゴリ: ${item.category}\n\n`
  str += item.content + "\n\n"
  if (item.attachments && item.attachments.length > 0) {
    str += "添付ファイル: \n"
    for (let i of item.attachments) {
      str += i.title + "\n\n"
    }
  }

  return str
}