import { Attendance } from "@dhu/core";

export const formatAttendance = (gpa: Attendance[]) => {
  let str = "";
  for (let i of gpa) {
    str += "<b>" + i.title + "</b>: ";
    str += "<b>" + i.rate + "</b>";
    str += "\n";
  }
  return str;
};

export const formatAttendanceDetail = (
  data: Attendance[],
  code: string
): string => {
  const detail = data.find((e) => e.code == code);
  if (!detail) {
    return "";
  }

  let message = `<b>${detail.title}</b>\n`;
  message += "code: " + code + "\n\n";
  for (let i of detail.records) {
    message += i.date + ": ";
    message += i.status !== "期試験/追試験/再試験" ? i.status : "";
    message += "\n";
  }

  return message;
};
