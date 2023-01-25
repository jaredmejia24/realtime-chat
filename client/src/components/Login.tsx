import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/api/v1";

type ChangeUser = (user: {}) => void;

const Login = ({ changeUser }: { changeUser: ChangeUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const body = { email, password };

      const response = await axios.post(`${API_URL}/auth/login`, body);

      changeUser(response.data);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Invalid user");
    }
  };
  return (
    <div>
      <form onSubmit={login}>
        <label htmlFor="email">email: </label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
