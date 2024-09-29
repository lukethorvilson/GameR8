import React from "react";
import RegisterInput from "./RegisterInput";

function RegisterBox() {
  return (
    <div className="row-span-3 mx-auto grid h-[60%] w-[45%] grid-cols-2 rounded-xl bg-cyan-950 px-4 py-8">
      <h1 className="col-span-2 mb-10 text-center text-2xl font-bold text-yellow-300">
        Register
      </h1>
      <RegisterInput label="First Name" id="firstName" />
      <RegisterInput label="Last Name" id="lastName" />
      <RegisterInput label="Email" id="email" />
      <RegisterInput label="Username" id="username" />
      <RegisterInput label="Password" id="password" />
      <RegisterInput label="Re-type Password" id="passwordCheck" />
      <button className="col-span-2 mx-auto h-[110%] w-[40%] rounded-md bg-yellow-300 font-bold text-cyan-950">
        Register
      </button>
    </div>
  );
}

export default RegisterBox;
