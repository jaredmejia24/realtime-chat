import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { User } from "../../types/users.types";

const API_URL = import.meta.env.VITE_API_URL;

const InputMessenger = ({
  socket,
  currentUser,
  room,
  toogleReRender,
}: {
  socket: Socket;
  currentUser: User;
  room: string;
  toogleReRender: () => void;
}) => {
  const [message, setMessage] = useState("");

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
        toogleReRender();
      }
    );
  };

  return (
    <form
      onSubmit={sendMessage}
      className="mt-[-4rem] flex gap-2 justify-center items-center"
    >
      <label htmlFor="message">Message:</label>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="text-black px-2 py-1 w-5/12"
        required
        name="message"
        type="text"
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
