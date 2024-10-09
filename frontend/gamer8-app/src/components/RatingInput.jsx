import React, { useState } from "react";
import Eight from "./Eight";

function RatingInput({ className }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  return (
    <div className="mx-auto mt-2 flex flex-row gap-8 rounded-xl border-2 border-yellow-300 border-opacity-20 p-4">
      {Array.from({ length: 8 }, (_, index) => (
        <Eight key={index} ratingNum={index + 1} rating={rating} setRating={setRating} hovered={hovered} setHovered={setHovered} className={className} />
      ))}
    </div>
  );
}

export default RatingInput;
