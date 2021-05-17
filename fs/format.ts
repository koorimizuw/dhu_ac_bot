import { FS } from "@dhu/core";

export const formatFS = (fs: FS[]) => {
  if (fs.length === 0) return "No fs record."
  let str = "<b>FS</b>: \n\n";
  return str;
};