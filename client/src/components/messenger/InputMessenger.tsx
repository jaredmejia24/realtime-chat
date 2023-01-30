import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { User } from "../../types/users.types";

const API_URL = import.meta.env.VITE_API_URL;

const InputMessenger = ({
  socket,
  currentUser,
  room,
}: {
  socket: Socket;
  currentUser: User;
  room: string;
}) => {
  const [message, setMessage] = useState("");

  let timeout;

  const emitTyping = () => {
    socket.emit("typing"), { isTyping: true };
    timeout = setTimeout(() => {
      socket.emit("typing", {
        isTyping: false,
        user: currentUser.data?.user.id,
      });
    }, 2000);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    socket.emit(
      "createMessage",
      {
        message,
        userId: currentUser.data?.user.id,
        roomId: room,
      },
      (res: any) => {
        setMessage("");
      }
    );
  };

  return (
    <form
      onSubmit={sendMessage}
      className="flex gap-2 m-2 justify-center items-center"
    >
      <label className="hidden sm:inline" htmlFor="message">Message:</label>
      <textarea
        value={message}
        onChange={(e) => {
          emitTyping();
          setMessage(e.target.value);
        }}
        className="text-black px-2 py-1 w-9/12 sm:w-7/12 max-h-[5rem]"
        required
        name="message"
        id="message"
      />
      <button
        type="submit"
        className="bg-slate-700 py-2 px-2 rounded-md hover:bg-slate-600"
      >
        Send
      </button>
    </form>
  );
};

export default InputMessenger;
