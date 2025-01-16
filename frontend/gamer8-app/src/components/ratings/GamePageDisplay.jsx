import React, { useContext } from 'react';
import GamePageDetails from './GamePageDetails';
import GameRateForm from './GameRateForm';
import RatingList from './RatingList';
import { RatingsContext } from '../../contexts/RatingsContext';
import { AuthContext } from '../../contexts/AuthContext';

function GamePageDisplay({
  gameData,
  ratingButton,
  ratingForm,
  handleClickRating,
  setFormShown,
}) {
  const {user, isAuthenticated} = useContext(AuthContext);
  const { ratingData } = useContext(RatingsContext);
  return (
    <>
      <div className="flex h-[600px] w-full flex-col bg-cyan-800">
        <div className="absolute top-20 z-0 mx-auto h-[70%] w-[100%]">
          <img
            src={gameData?.background_image}
            alt={`${gameData?.name}`}
            className="h-full w-full"
          />
        </div>
        <div className="absolute top-2/3 h-fit w-screen rounded-t-xl bg-cyan-800 pb-[65px]">
          <GamePageDetails gameData={gameData} />
          {isAuthenticated &&
            !ratingData?.some((rating) => {
              if (rating?.userId === user?.id) {
                return true;
              } else {
                return false;
              }
            }) && (
              <>
                <hr className="my-4 h-8 w-full rounded-xl border-none bg-cyan-950" />
                <GameRateForm
                  gameData={gameData}
                  ratingButton={ratingButton}
                  ratingForm={ratingForm}
                  handleClickRating={handleClickRating}
                  setFormShown={setFormShown}
                />
              </>
            )}
          <hr className="my-4 h-8 w-full rounded-xl border-none bg-cyan-950" />
          <RatingList title={gameData.name} />
        </div>
      </div>
    </>
  );
}

export default GamePageDisplay;
