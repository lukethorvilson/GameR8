import React from "react";
import { useNavigate } from "react-router-dom";

function SearchedGameEntry({ game, setSearchVal }) {
  const navigate = useNavigate();
  function handleGameClick() {
    navigate(`/game/${game.id}`);
    setSearchVal("");
  }
  return (
    <div
      onClick={handleGameClick}
      key={game.id}
      className="mx-auto mb-2 flex h-[30%] w-[95%] border-b-2 border-t-2 border-yellow-300 transition-colors hover:bg-cyan-800"
    >
      <img
        className="h-full w-[180px]"
        src={game.image}
        alt={`${game.name}`}
      />
      <p className="w-[70%] text-left ml-4 font-semibold font-base tracking-wider">{game.name}</p>
    </div>
  );
}

export default SearchedGameEntry;
