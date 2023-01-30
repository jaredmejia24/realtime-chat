import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { User } from "../../types/users.types";

type ChangeUser = (user: User) => void;
type ToogleIsLogin = () => void;

const API_URL = import.meta.env.VITE_API_URL + "/api/v1";

const Singup = ({
  toogleIsLogin,
  changeUser,
}: {
  toogleIsLogin: ToogleIsLogin;
  changeUser: ChangeUser;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const singup = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const data = {
        email,
        password,
        firstName,
        lastName,
      };
      await axios.post(`${API_URL}/auth/signup`, data);

      const body = { email, password };

      const response = await axios.post(`${API_URL}/auth/login`, body);

      changeUser(response.data);
    } catch (error) {
      const err = error as AxiosError;
      if (axios.isAxiosError(err)) {
        if (err.response?.data.message === "Email Already Exists") {
          alert("Email Already Exists");
        }
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full max-w-lg py-4 px-6 bg-gray-800 shadow-black shadow-md">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Sign up
        </h2>
      </div>
      <form
        onSubmit={singup}
        className="mt-8 space-y-6"
        action="#"
        method="POST"
      >
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm flex flex-col gap-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:gap-5">
            <label htmlFor="first-name" className="sr-only">
              First name:
            </label>
            <input
              id="first-name"
              name="firstName"
              type="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="relative appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="First Name"
            />
            <label htmlFor="first-name" className="sr-only">
              Last name:
            </label>
            <input
              id="last-name"
              name="lastName"
              type="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="relative appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Last Name"
            />
          </div>
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
            Sign up
          </button>
        </div>
        <p className="text-white">
          Already have an account?{" "}
          <span onClick={toogleIsLogin} className="text-red-500 cursor-pointer">
            Login in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Singup;
