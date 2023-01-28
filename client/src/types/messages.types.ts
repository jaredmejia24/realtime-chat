import { User } from "./users.types";
export type Message = {
  id: number;
  userId: number;
  roomId: number;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};
