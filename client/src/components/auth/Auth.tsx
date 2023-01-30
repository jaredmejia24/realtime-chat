import React, { useState } from "react";
import { User } from "../../types/users.types";
import Login from "./Login";
import Singup from "./Singup";

type ChangeUser = (user: User) => void;

const Auth = ({ changeUser }: { changeUser: ChangeUser }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toogleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLogin ? (
        <Login changeUser={changeUser} toogleIsLogin={toogleIsLogin} />
      ) : (
        <Singup toogleIsLogin={toogleIsLogin} changeUser={changeUser} />
      )}
    </div>
  );
};

export default Auth;
