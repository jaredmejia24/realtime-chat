import React, { useMemo, useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { User, UsersArray } from "../../types/users.types";
import { Message } from "../../types/messages.types";
import EachMessage from "./EachMessage";
import axios from "axios";
import EachUser from "./EachUser";
import InputMessenger from "./InputMessenger";
import Spinner from "../ui/Spinner";

const API_URL = import.meta.env.VITE_API_URL;

const socket = io(`http://localhost:4000`, {
  path: "/realtime-chat/socket.io",
});

const Chat = ({ currentUser }: { currentUser: User }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState<UsersArray>({});
  const [currentUserIdClicked, setCurrentUserIdClicked] = useState(0);
  const [typingDisplay, setTypingDisplay] = useState("");
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingRoom, setIsLoadingRoom] = useState(false);

  const changeRoom = (room: string) => {
    setRoom(room);
    setIsLoadingRoom(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const res = await axios.get(`${API_URL}/realtime-chat/api/v1/users`);
        setUsers(res.data);
      } catch (error) {
      } finally {
        setIsLoadingUsers(false);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (room !== "") {
      try {
        socket.emit("findAllMessages", { roomId: room }, (res: any) => {
          setMessages(res.data.messages);
        });
      } catch (error) {
        setMessages([]);
      } finally {
        setIsLoadingRoom(false);
      }
    } else {
      setMessages([]);
    }
  }, [room]);

  //listens sockets
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((current) => [message, ...current]);
    });

    socket.on("typing", ({ user, isTyping }) => {
      if (isTyping) {
        setTypingDisplay(`${user.firstName} ${user.lastName}`);
      } else {
        setTypingDisplay("");
      }
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col sm:grid sm:grid-cols-4 w-10/12 h-fit min-h-[792px] xl:min-h-[824px] m-auto bg-[#111B21] shadow-md shadow-black rounded-sm">
        <div className="flex flex-col overflow-y-auto">
          {isLoadingUsers ? (
            <Spinner />
          ) : (
            users.data?.users
              .filter((user) => currentUser.data?.user.id !== user.id)
              .map((user) => (
                <EachUser
                  setIsLoading={setIsLoadingRoom}
                  setCurrentUserIdClicked={setCurrentUserIdClicked}
                  currentUserIdClicked={currentUserIdClicked}
                  changeRoom={changeRoom}
                  currentUser={currentUser}
                  key={user.id}
                  user={user}
                />
              ))
          )}
        </div>
        <div className="h-full flex flex-col p-6 items-stretch justify-evenly gap-2 sm:col-span-3 bg-[#182127] text-white">
          {isLoadingRoom ? (
            <Spinner />
          ) : messages.length === 0 && room === "" ? (
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
            <div className="flex flex-col-reverse h-[28rem] px-3 gap-4 overflow-auto sm:h-[38rem] xl:h-[45rem]">
              {messages.map((message) => (
                <EachMessage
                  key={message.id}
                  currentUser={currentUser}
                  message={message}
                />
              ))}
            </div>
          )}

          {messages.length >= 0 && room !== "" ? (
            <div>
              <InputMessenger
                socket={socket}
                currentUser={currentUser}
                room={room}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Chat;
