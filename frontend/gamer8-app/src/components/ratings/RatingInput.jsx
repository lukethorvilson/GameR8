import React, { useState } from "react";
import Eight from "./Eight";

function RatingInput({ rating, setRating, className }) {
  const [hovered, setHovered] = useState(0);
  return (
    <>
      <h1 className="mt-6 text-center font-header text-xl text-yellow-300">
        Enter a R<span className="italic">8</span> Score
      </h1>
      <div className="mx-auto mt-2 flex flex-row gap-8 rounded-xl border-2 border-yellow-300 border-opacity-20 p-4">
        {Array.from({ length: 8 }, (_, index) => (
          <Eight
            key={index}
            ratingNum={index + 1}
            rating={rating}
            setRating={setRating}
            hovered={hovered}
            setHovered={setHovered}
            className={className + " transition-colors"}
          />
        ))}
      </div>
    </>
  );
}

export default RatingInput;
