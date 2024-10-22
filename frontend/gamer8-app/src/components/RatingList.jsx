import React, { useContext } from 'react';
import Rating from './Rating';
import { RatingsContext } from '../contexts/RatingsContext';

function RatingList({ title }) {
  const { filteredRatings } =
    useContext(RatingsContext);
  console.log(filteredRatings)
  return (
    <>
      <h2 className="mb-3 ml-4 mr-auto w-fit border-b-2 border-yellow-300 pb-3 font-header text-2xl font-bold text-yellow-300">
        User R
        <span className="font-extrabold italic">8</span>ings
        of {title}
      </h2>
      <div
        id="rating-container"
        className="mx-auto my-6 flex h-fit w-[95%] flex-col justify-center gap-4 rounded-md border-x-2 border-x-yellow-300 px-1"
      >
        {/* map each rating here to this rating object */}
        {filteredRatings?.length > 0 &&
          filteredRatings?.map((rating) => (
            <Rating key={rating?.id} rating={rating} />
          ))}
        {filteredRatings?.length === 0 && (
          <h2 className="text-center font-header text-2xl font-bold text-yellow-300">
            No detailed R
            <span className="font-extrabold italic">8</span>
            ings on this title yet!
          </h2>
        )}
      </div>
    </>
  );
}

export default RatingList;
