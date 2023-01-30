import React from "react";
import { io } from "socket.io-client";
import { Message } from "../../types/messages.types";
import { SingleUser, User } from "../../types/users.types";

type ChangeRoom = (room: string) => void;

const API_URL = import.meta.env.VITE_API_URL;

const socket = io(API_URL);

const EachUser = ({
  user,
  changeRoom,
  currentUser,
  currentUserIdClicked,
  setCurrentUserIdClicked,
}: {
  user: SingleUser;
  changeRoom: ChangeRoom;
  currentUser: User;
  currentUserIdClicked: number;
  setCurrentUserIdClicked: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const joinRoom = () => {
    let room = currentUser.data?.user.email + user.email;
    socket.emit("join", { room }, (res: any) => {
      if (res.status === "error") {
        room = user.email + currentUser.data?.user.email;
        socket.emit("join", { room }, (res: any) => {
          if (res.status === "error") {
            changeRoom(room);
          } else {
            changeRoom(res.roomId);
          }
        });
      } else {
        changeRoom(res.roomId);
      }
    });
    setCurrentUserIdClicked(user.id);
  };
  return (
    <div
      onClick={joinRoom}
      className={`${
        user.id === currentUserIdClicked ? "bg-[#2A3942] " : ""
      }text-white px-4 py-6 cursor-pointer hover:bg-[#2A3942]`}
    >
      <h3>{user.firstName + " " + user.lastName}</h3>
    </div>
  );
};

export default EachUser;
