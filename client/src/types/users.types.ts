export type User = {
  status: string;
  data?: {
    user: SingleUser;
  };
};

export type UsersArray = {
  status?: string;
  data?: {
    users: SingleUser[];
  };
};

export type SingleUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createAt: string;
  updateAt: string;
};
