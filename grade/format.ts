import { GPA } from "@dhu/core";

export default (gpa: GPA[]) => {
  let str = "";
  for (let i of gpa) {
    str += "<b>" + i.semester + "</b>: ";
    str += "<b>" + i.gpa + "</b>";
    str += "\n";
  }
  return str;
};
