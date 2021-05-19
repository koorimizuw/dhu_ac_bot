import { FS } from "@dhu/core";

export const formatFS = (fs: FS[]) => {
  if (fs.length === 0) return "No fs record."
  let str = "<b>FS</b>: \n\n";

  for (let i in fs) {
    str += `項目 ${i + 1}\n`
    str += `タイトル: ${fs[i].title}\n`
    str += `差出人: ${fs[i].sender}\n`
    str += `状態: ${fs[i].status}\n`
    str += `期限: ${fs[i].deadline}\n\n`
  }
  return str;
};