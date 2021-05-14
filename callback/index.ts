export type CallbackData = {
  name: string;
  data: any;
};

export const encodeCallbackData = (data: CallbackData): string => {
  return JSON.stringify(data);
};

export const decodeCallbackData = (data: string): CallbackData => {
  return JSON.parse(data);
};