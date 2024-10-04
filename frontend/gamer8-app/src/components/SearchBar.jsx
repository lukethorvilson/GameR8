import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import Spinner from "./Spinner";
import SearchedGameEntry from "./SearchedGameEntry";

function SearchBar() {
  const [searchVal, setSearchVal] = useState("");
  const [dbSearchVal] = useDebounce(searchVal, 700);
  const resultBox = useRef(null);
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchGames() {
      if (!dbSearchVal || dbSearchVal === "") {
        setSearchData([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_RAWG_GAMES}?key=${import.meta.env.VITE_RAWG_API_KEY}&search=${dbSearchVal}`,
        );

        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setSearchData(
          data.results.map((game) => {
            return {
              id: game.id,
              image: game.background_image,
              name: game.name,
            };
          }),
        );
        console.log(searchData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error("Fetch error: ", err);
      }
    }
    if (searchVal === "") {
      resultBox.current.classList.remove("h-72");
      resultBox.current.classList.add("h-0");
    } else {
      resultBox.current.classList.remove("h-0");
      resultBox.current.classList.add("h-72");
      if (dbSearchVal !== "") fetchGames();
    }
  }, [searchVal, dbSearchVal]);

  return (
    <>
      <div className="flex gap-4">
        <input
          className="ml-3 h-10 w-[75%] rounded-md border-0 bg-cyan-800 px-3 text-yellow-300 placeholder-yellow-300 placeholder-opacity-80 ring-1 ring-yellow-300 ring-offset-2 focus:ring-2 focus:ring-yellow-300"
          placeholder="Search Game-title; Users; platforms;"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button className="mr-3 w-[15%] rounded-md bg-yellow-300 text-sm text-cyan-950 hover:bg-yellow-400">
          Search
        </button>
      </div>
      <div
        ref={resultBox}
        className="absolute mx-auto mt-4 h-0 w-[50%] overflow-y-scroll rounded bg-cyan-950 transition-all"
      >
        {isLoading && (
          <Spinner className="mx-auto mt-8 animate-spin text-6xl" />
        )}

        {!isLoading && searchData.length > 0 && (
          <div className="mx-auto flex w-[95%] flex-col rounded-md border-l-2 border-r-2 border-yellow-300 px-2 py-2">
            {searchData.map((game) => (
              <SearchedGameEntry game={game} setSearchVal />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
