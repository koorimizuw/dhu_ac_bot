import { Attendance } from "@dhu/core";

export const formatAttendance = (atte: Attendance[]) => {
  let str = "<b>Your attendance data</b>: \n\n";
  for (let i in atte) {
    str += `<b>Subject ${i + 1}</b>: \n`
    str += "<b>" + atte[i].title.split(/[【\[]/)[0].trim() + "</b>: ";
    str += "<b>" + atte[i].rate + "</b>";
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
