import React, { useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { User, UsersArray } from "../../types/users.types";
import { Message } from "../../types/messages.types";
import EachMessage from "./EachMessage";
import axios from "axios";
import EachUser from "./EachUser";
import InputMessenger from "./InputMessenger";

const API_URL = import.meta.env.VITE_API_URL;

const socket = io(API_URL);

const Chat = ({ currentUser }: { currentUser: User }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState<UsersArray>({});
  const [currentUserIdClicked, setCurrentUserIdClicked] = useState(0);
  const [reRender, setReRender] = useState(false);

  const changeRoom = (room: string) => {
    setRoom(room);
  };

  const changeMessages = (messages: Message[]) => {
    setMessages(messages);
  };

  const toogleReRender = () => {
    setReRender(!reRender);
  };

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`${API_URL}/api/v1/users`);
      setUsers(res.data);
    };
    getUsers();
  }, []);

  useEffect(() => {
    console.log("in use effect");

    if (room !== "") {
      try {
        socket.emit("findAllMessages", { roomId: room }, (res: any) => {
          setMessages(res.data.messages);
        });
      } catch (error) {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }

    return () => {
      socket.off("message");
    };
  }, [room]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((current) => [...current, message]);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  console.log({ messages });
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col sm:grid sm:grid-cols-4 w-10/12 h-5/6 m-auto bg-[#111B21] shadow-md shadow-black rounded-sm">
        <div className="flex flex-col overflow-y-auto">
          {users.data?.users.map((user) => (
            <EachUser
              setCurrentUserIdClicked={setCurrentUserIdClicked}
              currentUserIdClicked={currentUserIdClicked}
              changeRoom={changeRoom}
              currentUser={currentUser}
              key={user.id}
              user={user}
            />
          ))}
        </div>
        <div className="h-full sm:col-span-3 bg-[#182127] text-white">
          {messages.length === 0 && room === "" ? (
            <div className="flex h-full justify-center items-center">
              <h1 className="text-lg text-center">
                Socket.io project send and recieve messages
              </h1>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full justify-center items-center">
              <h1 className="text-lg text-center">
                No messages found with this user
              </h1>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-center items-center">
              {messages.map((message) => (
                <EachMessage key={message.id} message={message} />
              ))}
            </div>
          )}
          {messages.length >= 0 && room !== "" ? (
            <>
              <InputMessenger
                socket={socket}
                toogleReRender={toogleReRender}
                currentUser={currentUser}
                room={room}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Chat;
