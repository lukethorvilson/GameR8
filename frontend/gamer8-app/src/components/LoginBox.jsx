import React from "react";

function LoginBox() {
  return (
    <div className="mx-auto flex h-[75%] w-[45%] rounded-xl flex-col bg-cyan-950 px-4 py-8">
      <h1 className="text-center text-yellow-300 text-2xl font-bold mb-10">Login</h1>
      <label htmlFor="username" className="text-yellow-300">
        Username or Email
      </label>
      <input
        id="username"
        placeholder="username or email"
        className="bg-cyan-800 placeholder-yellow-300 placeholder-opacity-70"
      />

      <label htmlFor="username" className="text-yellow-300">
        Username or Email
      </label>
      <input
        id="username"
        placeholder="username or email"
        className="bg-cyan-800 placeholder-yellow-300 placeholder-opacity-70"
      />
    </div>
  );
}

export default LoginBox;
