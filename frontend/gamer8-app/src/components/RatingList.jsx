import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Rating from "./Rating";

function RatingList({ ratings, setRatings }) {
  const { id: gameId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
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
        User R<span className="font-extrabold italic">8</span>ings of gameName
      </h2>
      <div
        id="rating-container"
        className="mx-auto my-6 flex h-fit w-[95%] justify-center rounded-md border-x-2 border-x-yellow-300 px-1"
      >
        {/* map each rating here to this rating object */}
        <Rating rating />
      </div>
    </>
  );
}

export default RatingList;
