import React from "react";

function LoginBox() {
  return (
    <div className="mx-auto flex h-[60%] w-[45%] flex-col rounded-xl bg-cyan-950 px-4 py-8">
      <h1 className="mb-10 text-center text-2xl font-bold text-yellow-300">
        Login
      </h1>
      <label
        htmlFor="username"
        className="mx-auto font-semibold text-yellow-300"
      >
        Username
      </label>
      <input
        id="username"
        placeholder="username | email"
        className="mx-auto mb-8 h-[6%] w-[80%] rounded-md bg-cyan-800 px-2 placeholder-yellow-300 placeholder-opacity-70"
      />

      <label
        htmlFor="password"
        className="mx-auto font-semibold text-yellow-300"
      >
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="username or email"
        className="mx-auto mb-8 h-[6%] w-[80%] rounded-md bg-cyan-800 px-2 placeholder-yellow-300 placeholder-opacity-70"
      />
      <button className="mx-auto h-[8%] w-[20%] rounded-md bg-yellow-300 font-bold text-cyan-950">
        Login
      </button>
    </div>
  );
}

export default LoginBox;
