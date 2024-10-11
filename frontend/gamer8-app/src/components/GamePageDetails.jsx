import React from "react";

function GamePageDetails({gameData}) {
  return (
    <>
      {" "}
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
    </>
  );
}

export default GamePageDetails;
