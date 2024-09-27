import React from "react";

function SearchBar() {
  return (
    <div className="flex gap-4">
      <input
        className="h-10 w-[75%] rounded-md border-0 bg-cyan-800 px-3 text-yellow-300 placeholder-yellow-300 placeholder-opacity-80 ring-1 ring-yellow-300 ring-offset-2 focus:ring-2 focus:ring-yellow-300 ml-3"
        placeholder="Search Game-title; Users; platforms;"
      />
      <button className="bg-yellow-300 text-cyan-950 text-sm hover:bg-yellow-400 w-[15%] mr-3 rounded-md">Search</button>
    </div>
  );
}

export default SearchBar;
