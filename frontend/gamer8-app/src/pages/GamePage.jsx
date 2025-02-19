import React from 'react';
import { useParams } from 'react-router-dom';
import useGameRateForm from '../hooks/useGameRateForm';
import useGamePageData from '../hooks/useGamePageData';
import GamePageDisplay from './../components/ratings/GamePageDisplay';
import { RatingsProvider } from './../contexts/RatingsContext';

// may need to use a context for some of the props being passed in here
function GamePage() {
  const { id } = useParams();
  const [
    ratingButton,
    ratingForm,
    handleClickRating,
    setFormShown,
  ] = useGameRateForm();
  const [gameData, isLoading] = useGamePageData(id);

  return (
    <div className="-z-10 h-fit w-full">
      {isLoading && (
        <div className="flex h-screen w-screen items-center justify-center bg-cyan-800">
          <div className="flex h-16 w-16 animate-spin items-center justify-center">
            <h1 className="bold text-7xl font-extrabold italic text-yellow-300">
              8
            </h1>
          </div>
        </div>
      )}
      {/* if game data is done loading and gameData is populated, provide the display with the correct ratings */}
      {!isLoading && gameData && (
        <RatingsProvider>
          <GamePageDisplay
            gameData={gameData}
            ratingButton={ratingButton}
            ratingForm={ratingForm}
            handleClickRating={handleClickRating}
            setFormShown={setFormShown}
          />
        </RatingsProvider>
      )}
    </div>
  );
}

export default GamePage;
