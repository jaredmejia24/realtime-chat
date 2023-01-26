import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/users.types";

const API_URL = import.meta.env.VITE_API_URL + "/api/v1";

type ChangeUser = (user: User) => void;

const Login = ({ changeUser }: { changeUser: ChangeUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
    <div className="w-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md py-4 px-6 bg-gray-800 shadow-black shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Login to your account
          </h2>
        </div>
        <form
          onSubmit={login}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm flex flex-col gap-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="flex justify-around gap-x-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
              <div
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="self-center"
              >
                {!isPasswordVisible ? (
                  <i className="fa-solid fa-eye text-slate-300 cursor-pointer text-xl hover:text-slate-400"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash text-slate-300 cursor-pointer text-xl hover:text-slate-400"></i>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
