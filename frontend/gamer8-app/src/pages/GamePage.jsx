import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import RatingInput from "../components/RatingInput";

function GamePage() {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ratingForm = useRef();
  const ratingButton = useRef();
  const [formShown, setFormShown] = useState(false);

  function handleClickRating() {
    setFormShown((val) => !val);
  }

  useEffect(() => {
    if (formShown) {
    }
  }, [formShown]);

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
                    <li key={platform.platform.id} className="italic">
                      {platform.platform.name}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {gameData.genres && (
              <>
                <h3 className="ml-8 mt-4 border-b-2 border-yellow-300 pb-2 text-lg text-yellow-300">
                  Genres
                </h3>
                <ul className="ml-12 list-disc text-yellow-300">
                  {gameData.genres.map((genre) => (
                    <li key={genre.id} className="italic">
                      {genre.name}
                    </li>
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
            <hr className="my-4 h-8 w-full rounded-xl border-none bg-cyan-950" />
            <h1 className="text-center text-4xl font-semibold text-yellow-300">
              {gameData.name}'s' R<span className="font-bold italic">8</span>
              ings
            </h1>
            <button
              ref={ratingButton}
              onClick={handleClickRating}
              className="mx-auto my-4 flex rounded-md bg-yellow-300 px-[40dvw] py-2 text-2xl"
            >
              R8 {gameData.name}
            </button>
            <form className="mx-auto flex w-[90dvw] flex-col">
              <label htmlFor="review-desc" className="text-lg text-yellow-300">
                Write your review here!
              </label>
              <textarea
                id="review-desc"
                type="text"
                maxLength={1000}
                placeholder={`Write your review about ${gameData.name} here!`}
                className="text-left p-2 h-[12dvh] overflow-y-auto border-2 border-yellow-300 bg-cyan-900 text-yellow-300 placeholder-yellow-300 placeholder-opacity-60 focus:ring-2 focus:ring-yellow-300"
              />
              <RatingInput className="text-6xl cursor-pointer"/>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
