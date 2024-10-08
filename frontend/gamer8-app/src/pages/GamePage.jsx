import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function GamePage() {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchGame() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_RAWG_GAMES}/${id}?key=${import.meta.env.VITE_RAWG_API_KEY}`,
        );
        const data = await response.json();
        setIsLoading(false);
        setGameData(data);
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    }
    if (!gameData) fetchGame();
  }, []);
  console.log(gameData);
  return (
    <div className="-z-10 h-fit w-full">
      {isLoading && <Spinner className="mx-auto" />}
      {!isLoading && gameData && (
        <div className="flex h-[600px] w-full flex-col bg-cyan-800">
          <div className="absolute top-20 z-0 mx-auto h-[70%] w-[100%]">
            <img
              src={gameData.background_image}
              alt={`Image of ${gameData.name}`}
              className="h-full w-full"
            />
          </div>
          <div className="absolute top-2/3 h-fit w-screen rounded-t-xl bg-cyan-800 pb-[65px]">
            <h1 className="ml-8 mt-4 text-4xl font-bold italic text-yellow-300">
              {gameData.name}
            </h1>
            <p className="ml-8 mt-1 text-yellow-300">
              Developed by {gameData.developers[0].name}
            </p>
            <p className="ml-8 mt-4 border-l-2 border-yellow-300 pl-4 text-base text-yellow-300">
              {gameData.description_raw
                ? gameData.description_raw
                : "No game description available"}
            </p>


            {gameData.platforms.length && (
              <>
                <h3 className="ml-8 mt-4 border-b-2 border-yellow-300 pb-2 text-lg text-yellow-300">
                  Genres
                </h3>
                <ul className="ml-12 list-disc text-yellow-300">
                  {gameData.platforms.map((platform) => (
                    <li key={platform.platform.id} className="italic">{platform.platform.name}</li>
                  ))}
                </ul>
              </>)}

            {gameData.genres && (
              <>
                <h3 className="ml-8 mt-4 border-b-2 border-yellow-300 pb-2 text-lg text-yellow-300">
                  Genres
                </h3>
                <ul className="ml-12 list-disc text-yellow-300">
                  {gameData.genres.map((genre) => (
                    <li key={genre.id} className="italic">{genre.name}</li>
                  ))}
                </ul>
              </>
            )}

            {gameData?.esrb_rating?.name ? (
              <>
                <h2 className="mb-2 ml-8 mt-2 border-b-2 border-yellow-300 pb-2 text-lg text-yellow-300">
                  ESRB Rating
                </h2>
                <p className="ml-8 text-2xl font-bold text-yellow-300">
                  {gameData.esrb_rating.name.toUpperCase()}
                </p>
              </>
            ) : (
              <h2>No rating available!</h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
