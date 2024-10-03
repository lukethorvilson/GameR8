import React from "react";

function LoginInput({ label, placeholder, name, value, onChange, isPassword }) {
  return (
    <>
      <label
        htmlFor={label.toLowerCase()}
        className="mb-2 content-start font-semibold text-yellow-300"
      >
        {label}
      </label>
      <input
        id={label.toLowerCase()}
        placeholder={placeholder}
        name={name}
        type={isPassword ? "password" : ""}
        className="mb-8 h-[14%] w-[90%] content-start rounded-md bg-cyan-800 px-2 text-yellow-300 placeholder-yellow-300 placeholder-opacity-70"
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default LoginInput;
