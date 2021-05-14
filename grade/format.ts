import { GPA } from "@dhu/core";

export const formatGPA = (gpa: GPA[]) => {
  let str = "<b>Your GPA:</b> \n\n";
  for (let i of gpa) {
    str += `${i.semester}: ${i.gpa}`
    str += "\n";
  }
  return str;
};
