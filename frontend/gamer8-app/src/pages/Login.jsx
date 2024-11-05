import React from "react";
import LoginBox from "../components/authentication/LoginBox";

function Login() {
  return (
    <div className="flex h-screen w-screen flex-col justify-center gap-5 bg-cyan-800">
      <div className="mx-auto flex flex-row font-header text-6xl font-extrabold text-yellow-300">
        Game R<span className="italic">8</span>
      </div>
      <LoginBox />
    </div>
  );
}

export default Login;
