import React from "react";
import RatingInput from "./RatingInput";

function GameRateForm({
  ratingButton,
  handleClickRating,
  gameData,
  ratingForm,
}) {
  return (
    <>
      <button
        ref={ratingButton}
        type="button"
        onClick={handleClickRating}
        className={`mx-auto my-4 flex rounded-md bg-yellow-300 px-[40dvw] py-2 text-2xl`}
      >
        R8 {gameData.name}
      </button>
      <form ref={ratingForm} className={`mx-auto hidden w-[90dvw]`}>
        <div className="my-4 h-[5vh]">
          <button
            onClick={(e) => {
              e.preventDefault();
              setFormShown((val) => !val);
            }}
            className="h-fit w-fit rounded-xl border-2 border-yellow-300 px-4 py-2 text-left text-2xl font-bold text-yellow-300 hover:border-4"
          >
            x
          </button>
        </div>

        <label htmlFor="title" className="text-lg text-yellow-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="h-[3dvh] overflow-y-auto rounded-md border-2 border-yellow-300 bg-cyan-900 p-2 text-left text-yellow-300 placeholder-yellow-300 placeholder-opacity-60 focus:ring-2 focus:ring-yellow-300"
        ></input>
        <label htmlFor="review-desc" className="text-lg text-yellow-300">
          Write your review here!
        </label>
        <textarea
          id="review-desc"
          type="text"
          maxLength={1000}
          placeholder={`Write your review about ${gameData.name} here!`}
          className="h-[12dvh] overflow-y-auto rounded-md border-2 border-yellow-300 bg-cyan-900 p-2 text-left text-yellow-300 placeholder-yellow-300 placeholder-opacity-60 focus:ring-2 focus:ring-yellow-300"
        />
        <RatingInput className="cursor-pointer text-6xl" />
      </form>
    </>
  );
}

export default GameRateForm;
