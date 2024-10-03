import React from "react";

function SearchedGameEntry({ game, key }) {
  return (
    <div
      key={key}
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
