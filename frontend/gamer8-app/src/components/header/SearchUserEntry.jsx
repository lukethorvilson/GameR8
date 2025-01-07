import React from "react";
import { useNavigate } from "react-router-dom";

function SearchedGameEntry({ user, setSearchVal }) {
  const navigate = useNavigate();
  function handleGameClick() {
    navigate(`/profile/${user.id}`);
    setSearchVal("");
  }
  return (
    <div
      onClick={handleGameClick}
      key={user.id}
      className="mx-auto mb-2 flex h-[30%] w-[95%] border-b-2 border-t-2 border-yellow-300 transition-colors hover:bg-cyan-800"
    >
      {/*User information goes here in search method*/}
    </div>
  );
}

export default SearchedGameEntry;