import React from "react";

function RegisterInput({label, id}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mx-auto mb-2 font-semibold text-yellow-300"
      >
        {label}
      </label>
      <input
        id={id}
        placeholder={label}
        className="mx-auto mb-8 h-[30%] w-[95%] rounded-md bg-cyan-800 px-2 placeholder-yellow-300 placeholder-opacity-70"
      />
    </div>
  );
}

export default RegisterInput;
