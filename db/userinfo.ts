import { User, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserInfo = async (chatId: number): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { chat_id: chatId } });
};

export const setUserInfo = async (user: Prisma.UserCreateInput) => {
  await prisma.user.create({ data: user });
};

export const updateUserInfo = async (
  id: number,
  user: Prisma.UserCreateInput
) => {
  await prisma.user.update({
    where: {
      chat_id: id,
    },
    data: user,
  });
};

export const deleteUserInfo = async (id: number) => {
  await prisma.user.delete({
    where: {
      uid: id,
    },
  });
};
