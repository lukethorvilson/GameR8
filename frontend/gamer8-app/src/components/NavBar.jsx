import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import SearchBar from "./SearchBar";
import UserIcon from "./UserIcon";
import { useState } from "react";
import useLoggedUser from "../hooks/useLoggedUser";
import { FaRegUserCircle } from "react-icons/fa";

function NavBar() {
  const [hasAccess, user, setUser, isLoading] = useLoggedUser();
  const navigate = useNavigate();
  function navigateLogin() {
    navigate("/login");
  }

  return (
    <div className="sticky top-0 z-10 mx-auto flex h-20 w-[100%] flex-row justify-between bg-cyan-950 text-center text-base">
      <div className="h-[100%] w-[15%] content-center justify-center">
        <Logo className="ml-4 cursor-default text-6xl font-extrabold text-yellow-300" />
      </div>

      <div className="h-[100%] w-[60%] content-center justify-center text-yellow-300">
        <SearchBar />
      </div>
      <div className="h-[100%] w-[10%] content-center justify-center text-yellow-300">
        {!hasAccess ? (
          <button
            onClick={() => navigateLogin()}
            className="h-[40%] w-[60%] rounded-md bg-yellow-300 text-cyan-950"
          >
            Login
          </button>
        ) : (
          <FaRegUserCircle className="mx-auto h-[50%] w-[50%] text-yellow-300" />
        )}
      </div>
    </div>
  );
}

export default NavBar;
