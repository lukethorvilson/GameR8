import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import useGameRateForm from "../hooks/useGameRateForm";
import useGamePageData from "../hooks/useGamePageData";
import GamePageDisplay from "../components/GamePageDisplay";

// may need to use a context for some of the props being passed in here
function GamePage() {
  const { id } = useParams();
  const [ratingButton, ratingForm, handleClickRating, setFormShown] =
    useGameRateForm();
  const [gameData, isLoading] = useGamePageData(id);

  return (
    <div className="-z-10 h-fit w-full">
      {isLoading && <Spinner className="mx-auto" />}
      {!isLoading && gameData && (
        <GamePageDisplay
          gameData={gameData}
          ratingButton={ratingButton}
          ratingForm={ratingForm}
          handleClickRating={handleClickRating}
          setFormShown={setFormShown}
        />
      )}
    </div>
  );
}

export default GamePage;
