import React from "react";

function RegisterInput({ label, id, name, isPassword, value, onChange }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-header mx-auto mb-2 font-semibold text-yellow-300"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        placeholder={label}
        type={isPassword ? "password" : ""}
        value={value}
        onChange={onChange}
        className="font-base mx-auto mb-8 h-[30%] w-[95%] rounded-md  bg-cyan-800 px-2 text-yellow-300 placeholder-yellow-300 placeholder-opacity-60"
      />
    </div>
  );
}

export default RegisterInput;
