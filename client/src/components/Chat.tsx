import React from "react";
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:4000");

const Chat = () => {
  useEffect(() => {
    socket.emit("findAllMessages", {}, {});
  }, []);
  return (
    <div>
      <h1>in chat</h1>
    </div>
  );
};

export default Chat;
