import axios from "axios";
import React from "react";
import { User } from "../types/users.types";

const API_URL = import.meta.env.VITE_API_URL + "/api/v1";

type ChangeUser = (user: User) => void;

const Logout = ({ changeUser }: { changeUser: ChangeUser }) => {
  const logout = async () => {

    await axios.post(`${API_URL}/auth/logout`);
    changeUser({ status: "Unauthorized" });
  };

  return (
    <div className="fixed bottom-3 right-3 md:bottom-6 md:right-6 cursor-pointer text-lg bg-slate-700 py-2 px-4 rounded-lg hover:bg-slate-600">
      <button className="text-white" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
