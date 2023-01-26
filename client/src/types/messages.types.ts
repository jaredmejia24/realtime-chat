export type MessageArray = {
  status: string;
  data?: {
    messages: Message[];
  };
};

export type Message = {
  id: number;
  userId: number;
  roomId: number;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
