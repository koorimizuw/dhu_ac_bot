import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import { FS, FS_QUESTIONS, FSFormAnswers, fillFS, LoginContext } from "@dhu/core";
import { encodeCallbackData, decodeCallbackData } from "../callback"
import { ask, choose } from "../utils";

export const callbackAction = async (bot: TelegramBot, query: CallbackQuery, data: FS[], ctx: LoginContext) => {
  const action = decodeCallbackData(query.data as string)

  switch (action.name) {
    case "fillFS":
      await bot.editMessageReplyMarkup({
        inline_keyboard: data.map((item, index) => {
          return [{
            text: item.title,
            callback_data: encodeCallbackData({
              name: "fillFSItem",
              data: { index },
            }),
          },];
        })
      }, {
        chat_id: query.from.id,
        message_id: query.message?.message_id,
      });
      break;
    case "fillFSItem":
      bot.sendMessage(query.from.id, "記入しない場合は数字の `0` を入力してください")
      const fsAnswer: FSFormAnswers[number][] = []
      for (let item of FS_QUESTIONS) {
        switch (item.type) {
          case "select":
            const as = await choose(bot, query.from.id, item.text, [...item.options].map(opt => opt.label))
            await bot.sendMessage(query.from.id, `あなたの選択は: <b>${item.options[Number(as)].label}</b>`, { parse_mode: "HTML" })
            fsAnswer.push(item.options[Number(as)].value)
            break;
          case "input":
            const ai = await ask(bot, query.from.id, item.text)
            fsAnswer.push(ai === "0" ? "" : ai)
            break;
        }
      }
      const res = await fillFS(ctx.page, action.data.index, fsAnswer as FSFormAnswers)
      bot.sendMessage(query.from.id, "完了しました。")
  }
};
