export interface Result {
  success: boolean;
  message: string;
}

const userExistsMessage = `
User is exists.

Type '/updateinfo' to update your user info.
`;

export const USER_EXISTS: Result = {
  success: false,
  message: userExistsMessage,
};

export const BAD_FORMAT: Result = {
  success: false,
  message: "Dhu id or password format is bad.",
};

export const LOGIN_SUCCESS: Result = {
  success: true,
  message: "Login successful.",
};

export interface UpdateResult {
  success: boolean;
  message: string;
}

const userNotExistsMessage = `
User is not exists.

Type '/login' to login your dhu account.
`;

export const USER_NOT_EXISTS: Result = {
  success: false,
  message: userNotExistsMessage,
};

export const AUTH_FAILED: Result = {
  success: false,
  message: "Authenticate failed.",
};
