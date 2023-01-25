import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";

const API_URL = "http://localhost:4000/api/v1";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUserInSession());
  }, []);

  const changeUser = (user: {}) => {
    setUser(user);
  };

  const getUserInSession = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/me`);
      return res.data;
    } catch (error) {
      return {};
    }
  };

  return <section>{user ? <Chat /> : <Login changeUser={changeUser} />}</section>;
}

export default App;
