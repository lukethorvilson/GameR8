import React from "react";
import GamePageDetails from "./GamePageDetails";
import GameRateForm from "./GameRateForm";

function GamePageDisplay({
  gameData,
  ratingButton,
  ratingForm,
  handleClickRating,
  setFormShown,
}) {
  return (
    <>
      <div className="flex h-[600px] w-full flex-col bg-cyan-800">
        <div className="absolute top-20 z-0 mx-auto h-[70%] w-[100%]">
          <img
            src={gameData.background_image}
            alt={`Image of ${gameData.name}`}
            className="h-full w-full"
          />
        </div>
        <div className="absolute top-2/3 h-fit w-screen rounded-t-xl bg-cyan-800 pb-[65px]">
          <GamePageDetails gameData={gameData} />
          <hr className="my-4 h-8 w-full rounded-xl border-none bg-cyan-950" />
          <h1 className="text-center text-4xl font-semibold text-yellow-300">
            {gameData.name}'s' R<span className="font-bold italic">8</span>
            ings
          </h1>
          <GameRateForm
            gameData={gameData}
            ratingButton={ratingButton}
            ratingForm={ratingForm}
            handleClickRating={handleClickRating}
            setFormShown={setFormShown}
          />
        </div>
      </div>
    </>
  );
}

export default GamePageDisplay;
