import React from "react";
import Logo from "../components/Logo";
import LoginBox from "../components/LoginBox";

function Login() {
  return (
    <div className="flex h-screen w-screen flex-col bg-cyan-800 justify-center gap-5">
      <div className="flex font-header mx-auto flex-row text-6xl font-extrabold text-yellow-300">
        Game R<span className="italic">8</span>
      </div>
    <LoginBox/>
    </div>
  );
}

export default Login;
