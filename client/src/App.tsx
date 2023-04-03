import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/messenger/Chat";
import Logout from "./components/Logout";
import { User } from "./types/users.types";
import Auth from "./components/auth/Auth";

const API_URL = import.meta.env.VITE_API_URL + "/realtime-chat/api/v1";

function App() {
  const [user, setUser] = useState<User>({ status: "Unauthorized" });

  const getUserInSession = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/me`);
      setUser(res.data);
    } catch (error) {
      const err = error as AxiosError;
      if (axios.isAxiosError(err)) {
        if (err.response?.statusText === "Unauthorized") {
          setUser({ status: err.response?.statusText });
        }
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUserInSession();
  }, []);

  const changeUser = (user: User) => {
    setUser(user);
  };

  return (
    <>
      {user.status === "success" ? (
        <Chat currentUser={user} />
      ) : (
        <Auth changeUser={changeUser} />
      )}
      {user.status === "success" && <Logout changeUser={changeUser} />}
    </>
  );
}

export default App;
