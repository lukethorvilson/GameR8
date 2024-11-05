import React from "react";

function Eight({
  className,
  ratingNum,
  hovered,
  setHovered,
  rating,
  setRating,
}) {
  function isEntered() {
    setHovered(ratingNum);
  }

  function isExited() {
    setHovered(0);
  }

  function handleClickRating() {
    setRating(ratingNum);
  }

  return (
    <div
      onMouseEnter={isEntered}
      onMouseLeave={isExited}
      onClick={handleClickRating}
      className={className}
    >
      {rating > 0 && rating >= ratingNum ? (
        <span className="font-extrabold italic text-yellow-300">8</span>
      ) : hovered >= ratingNum ? (
        <span className="font-extrabold italic text-yellow-300 text-opacity-50">
          8
        </span>
      ) : (
        <span className="font-extrabold italic text-cyan-950">8</span>
      )}
    </div>
  );
}

export default Eight;
