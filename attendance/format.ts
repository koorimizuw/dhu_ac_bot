import { Attendance } from "@dhu/core";

export default (gpa: Attendance[]) => {
  let str = "";
  for (let i of gpa) {
    str += "<b>" + i.title + "</b>: ";
    str += "<b>" + i.rate + "</b>";
    str += "\n";
  }
  return str;
};
