import React, { useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { User, UsersArray } from "../../types/users.types";
import { MessageArray } from "../../types/messages.types";
import EachMessage from "./EachMessage";
import axios from "axios";
import EachUser from "./EachUser";

const API_URL = import.meta.env.VITE_API_URL;

const socket = io(API_URL);

const Chat = ({ user }: { user: User }) => {
  const [messages, setMessages] = useState<MessageArray>({ status: "loading" });
  const [users, setUsers] = useState<UsersArray>({});

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`${API_URL}/api/v1/users`);
      setUsers(res.data);
    };
    getUsers();
  }, []);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col sm:grid sm:grid-cols-4 w-10/12 h-5/6 m-auto bg-[#111B21] shadow-md shadow-black rounded-sm">
        <div className="flex flex-col gap-4 overflow-y-auto">
          {users.data?.users.map((user) => (
            <EachUser key={user.id} user={user} />
          ))}
        </div>
        <div className="h-full sm:col-span-3 bg-[#182127] text-white">
          {messages.status === "loading" ? (
            <div className="flex h-full justify-center items-center">
              <h1 className="text-lg text-center">
                Socket.io project send and recieve messages
              </h1>
            </div>
          ) : (
            messages.data?.messages.map((message) => (
              <EachMessage key={message.id} message={message} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
