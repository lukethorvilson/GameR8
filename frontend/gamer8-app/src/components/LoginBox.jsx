import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginInput from "./LoginInput";
import Spinner from "./Spinner";

function LoginBox() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    if (!formData.usernameOrEmail || !formData.password) {
      setError("Please fill in all data fields to login as a user!");
      setTimeout(() => {
        setError(null);
      }, 1000 * 30);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:8000/gamer8/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include", // Include cookies with requests
        },
      );
      setIsLoading(false);
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: data.accessToken,
            refreshToken: data.refreshToken,
          }),
        );
        localStorage.setItem("user", JSON.stringify({ user: data.user }));
      }

      navigate(response.ok ? "/" : "/login");
      if (response.ok) {
        console.log("User successfully logged in!");
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
    <div className="mx-auto h-[60%] w-[45%] rounded-xl bg-cyan-950 px-4 py-8">
      <h1 className="mb-10 text-center text-2xl font-bold text-yellow-300">
        Login
      </h1>
      {error && (
        <p className="mx-auto bg-red-500 p-4 text-base text-white">
          Login Error: {error}
        </p>
      )}
      <form
        className="mx-auto flex h-[70%] w-[100%] flex-col rounded-xl bg-cyan-950 px-2"
        onSubmit={handleLoginSubmit}
      >
        <LoginInput
          label="Username"
          placeholder="Username or Email"
          name="usernameOrEmail"
          isPassword={false}
          value={formData.usernameOrEmail}
          onChange={handleChange}
        />
        <LoginInput
          label="Password"
          placeholder="Password"
          name="password"
          isPassword={true}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          className="mx-auto h-[12%] w-[25%] rounded-md bg-yellow-300 font-bold text-cyan-950"
          type="submit"
        >
          {isLoading ? <Spinner className="" /> : "Login"}
        </button>
      </form>

      <p className="ml-4 mt-4 text-yellow-300">
        New user?{" "}
        <button
          className="hover:underline"
          onClick={() => navigate("/register")}
        >
          Register here &rarr;
        </button>
      </p>
    </div>
  );
}

export default LoginBox;
