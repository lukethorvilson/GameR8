import React, { useContext, useState } from 'react';
import RatingInput from './RatingInput';
import useLoggedUser from '../../hooks/useLoggedUser';
import useGameRateForm from '../../hooks/useGameRateForm';
import { useParams } from 'react-router-dom';
import { RatingsContext } from '../../contexts/RatingsContext';

function GameRateForm({
  ratingButton,
  handleClickRating,
  gameData,
  ratingForm,
  setFormShown,
}) {
  const [ratingBody, setRatingBody] = useState({
    title: '',
    description: '',
    rating: 0,
  });
  const { id: gameId } = useParams();
  const [, user] = useLoggedUser();
  useGameRateForm();
  const { setRatingData } = useContext(RatingsContext);
  async function handleSubmit(e) {
    e.preventDefault();
    // if theres no rating, don't submit
    if (!ratingBody.rating) return;

    //if rating then fetch api,
    try {
      const response = await fetch(
        'http://localhost:8000/gamer8/api/v1/ratings',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...ratingBody,
            author: user.username,
            userId: user.id,
            gameId,
            gameName: gameData.name,
          }),
        },
      );
      const data = await response.json();
      // if the data was submitted
      if (response.ok) {
        // TO-DO
        // if success we should get a new rating object back and place it in the current pool if ratings
        setRatingData((curr) => [
          {
            ...ratingBody,
            author: user.username,
            userId: user.id,
            gameId,
            gameName: gameData.name,
          },
          ...curr,
        ]);
        // reset data and hide form!
        setRatingBody((curr) => ({
          ...curr,
          title: '',
          description: '',
          rating: 0,
        }));
        setFormShown(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <button
        ref={ratingButton}
        type="button"
        onClick={handleClickRating}
        className={`mx-auto my-4 flex rounded-md bg-yellow-300 px-[10dvw] py-2 font-header text-2xl text-cyan-950`}
      >
        R8 {gameData.name}
      </button>
      <form
        ref={ratingForm}
        onSubmit={(e) => handleSubmit(e)}
        className={`mx-auto hidden w-[90dvw]`}
      >
        <div className="my-4 h-[5vh]">
          <button
            onClick={(e) => {
              e.preventDefault();
              setFormShown((val) => !val);
            }}
            className="h-fit w-fit rounded-xl border-2 border-yellow-300 px-3 py-1 text-left font-base text-xl font-bold text-yellow-300 hover:border-4"
          >
            x
          </button>
        </div>

        <label
          htmlFor="title"
          className="font-header text-lg text-yellow-300"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={ratingBody.title}
          onChange={(e) =>
            setRatingBody((body) => ({
              ...body,
              title: e.target.value,
            }))
          }
          className="h-[3dvh] overflow-y-auto rounded-md border-2 border-yellow-300 bg-cyan-900 p-2 text-left font-base text-yellow-300 placeholder-yellow-300 placeholder-opacity-60 focus:ring-2 focus:ring-yellow-300"
        ></input>
        <label
          htmlFor="review-desc"
          className="font-header text-lg text-yellow-300"
        >
          Write your review here!
        </label>
        <textarea
          id="review-desc"
          type="text"
          name="description"
          value={ratingBody.description}
          onChange={(e) =>
            setRatingBody((body) => ({
              ...body,
              description: e.target.value,
            }))
          }
          maxLength={1000}
          placeholder={`Write your review about ${gameData.name} here!`}
          className="h-[12dvh] overflow-y-auto rounded-md border-2 border-yellow-300 bg-cyan-900 p-2 text-left font-base text-yellow-300 placeholder-yellow-300 placeholder-opacity-60 focus:ring-2 focus:ring-yellow-300"
        />
        <RatingInput
          rating={ratingBody.rating}
          setRating={(newRating) =>
            setRatingBody((body) => ({
              ...body, // Spread the previous state
              rating: newRating, // Update only the 'rating' property
            }))
          }
          className="cursor-pointer text-6xl"
        />
        <button
          type="submit"
          className="mx-auto my-5 h-[50px] w-[150px] rounded-md bg-yellow-300 font-bold text-cyan-950"
        >
          R<span className="font-extrabold italic">8</span>
        </button>
      </form>
    </>
  );
}

export default GameRateForm;
