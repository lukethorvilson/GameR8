import React, { useState } from "react";
import RegisterInput from "./RegisterInput";
import Register from "../pages/Register";

function RegisterBox() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    passwordCheck: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.passwordCheck
    )
      return;

    if (formData.password !== formData.passwordCheck) return;
    try {
      const response = await fetch("http://localhost:8000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User successfully created!");
      } else {
        console.log("There was an error!");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div className="mx-auto h-[65%] w-[60%] rounded-xl bg-cyan-950 px-4 py-8">
      <h1 className="col-span-2 mb-10 text-center text-2xl font-bold text-yellow-300">
        Register
      </h1>
      <form
        onSubmit={handleRegisterSubmit}
        className="row-span-3 grid h-[80%] w-[100%] grid-cols-2"
      >
        <RegisterInput
          label="First Name"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <RegisterInput
          label="Last Name"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <RegisterInput
          label="Email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <RegisterInput
          label="Username"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <RegisterInput
          label="Password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <RegisterInput
          label="Re-type Password"
          name="passwordCheck"
          id="passwordCheck"
          value={formData.passwordCheck}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="col-span-2 mx-auto h-[110%] w-[40%] rounded-md bg-yellow-300 font-bold text-cyan-950"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterBox;
