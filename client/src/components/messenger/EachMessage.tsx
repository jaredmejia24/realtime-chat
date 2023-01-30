import React from "react";
import { Message } from "../../types/messages.types";
import { User } from "../../types/users.types";

const EachMessage = ({
  message,
  currentUser,
}: {
  message: Message;
  currentUser: User;
}) => {

  return (
    <div
      className={`${
        message.userId === currentUser.data?.user.id
          ? "self-end bg-[#005C4B]"
          : ""
      }
      p-4 rounded-2xl bg-slate-600 w-fit max-w-sm`}
    >
      <p>{message.message}</p>
    </div>
  );
};

export default EachMessage;
