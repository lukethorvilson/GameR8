import React from "react";
import { useNavigate } from "react-router-dom";

function SearchedGameEntry({ game }) {
  const navigate = useNavigate();
  function handleGameClick(){
    navigate(`/game/${game.id}`);
  }
  return (
    <div
      onClick={handleGameClick}
      key={game.id}
      className="mx-auto mb-2 flex h-[20%] w-[95%] border-b-2 border-t-2 border-yellow-300 transition-colors hover:bg-cyan-800"
    >
      <img
        className="h-[100px] w-[180px]"
        src={game.image}
        alt={`Image of ${game.name}`}
      />
      <p className="ml-3 w-[70%] text-center">{game.name}</p>
    </div>
  );
}

export default SearchedGameEntry;
