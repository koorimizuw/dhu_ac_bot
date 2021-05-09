export interface Result {
  scuess: boolean;
  message: string;
}

const userExistsMessage = `
User is exists.

Type '/updateinfo' to update your user info.
`;

export const USER_EXISTS: Result = {
  scuess: false,
  message: userExistsMessage,
};

export const BAD_FORMAT: Result = {
  scuess: false,
  message: "Dhu id or password format is bad.",
};

export const LOGIN_SUCCESS: Result = {
  scuess: true,
  message: "Login successful.",
};

export interface UpdateResult {
  scuess: boolean;
  message: string;
}

const userNotExistsMessage = `
User is not exists.

Type '/login' to login your dhu account.
`;

export const USER_NOT_EXISTS: Result = {
  scuess: false,
  message: userNotExistsMessage,
};

export const AUTH_FAILED: Result = {
  scuess: false,
  message: "Authenticate failed.",
};
