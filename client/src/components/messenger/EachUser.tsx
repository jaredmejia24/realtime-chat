import React from "react";
import { SingleUser } from "../../types/users.types";

const EachUser = ({ user }: { user: SingleUser }) => {
  return (
    <div className="text-white px-4 py-4 cursor-pointer hover:bg-[#2A3942]">
      <h3>{user.firstName + " " + user.lastName}</h3>
    </div>
  );
};

export default EachUser;
