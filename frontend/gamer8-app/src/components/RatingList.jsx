import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Rating from "./Rating";

function RatingList({ ratingData, setRatingData, title }) {
  const { id: gameId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  console.log(ratingData);
  const filteredData = ratingData.filter((rating) => {
    if (rating.title && rating.description) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    async function fetchRatings() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/ratings?gameId=${gameId}`,
          {
            method: "GET",
          },
        );
        const data = await response.json();
        console.log(data);
        if (response.ok && data.body.ratings) {
          setRatingData([...data.body.ratings]);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
    fetchRatings();
  }, []);
  return (
    <>
      <h2 className="mb-3 ml-4 mr-auto w-fit border-b-2 border-yellow-300 pb-3 text-2xl font-bold text-yellow-300">
        User R<span className="font-extrabold italic">8</span>ings of {title}
      </h2>
      <div
        id="rating-container"
        className="mx-auto my-6 flex h-fit w-[95%] flex-col justify-center gap-4 rounded-md border-x-2 border-x-yellow-300 px-1"
      >
        {/* map each rating here to this rating object */}
        {filteredData.length > 0 &&
          filteredData.map((rating) => <Rating rating={rating} />)}
        {filteredData.length === 0 && (
          <h2 className="text-center text-2xl font-bold text-yellow-300">
            No R<span className="font-extrabold italic">8</span>ings on this
            title yet!
          </h2>
        )}
      </div>
    </>
  );
}

export default RatingList;
