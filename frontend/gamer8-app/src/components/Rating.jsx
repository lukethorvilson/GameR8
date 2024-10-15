import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

function Rating({rating}) {
  return (
    <div className="flex h-fit w-[90%] flex-col rounded-lg border-4 border-cyan-950 bg-cyan-600 transition-all hover:border-8">
      <div id="username-container" className="mr-auto flex flex-row">
        <FaRegUserCircle className="m-2 ml-2 h-[25px] w-[25px] text-yellow-300" />
        <h6 className="my-auto text-yellow-300">username</h6>
      </div>
      <div id="rating-title-container">
        <h3 className="mr-auto flex bg-cyan-800 py-2 pl-4 text-xl font-bold text-yellow-300">
          Test title
        </h3>
      </div>
      <div id="rating-description-container">
        <p className="h-fit px-4 py-4 text-left text-yellow-400">
          Some fake description to test the layout of this review box and the
          looks of the review box. This is just a filler to see what it may look
          like based on a specific amount of input from the user from the node
          js database query.
        </p>
      </div>
      <div className="rating-score-container my-auto flex flex-row p-2">
        <h6 className="my-auto ml-4 text-base font-bold text-yellow-300">
          R<span className="font-extrabold italic">8</span> Score:
        </h6>
        {/* maybe use the rating 8 8 8 8 8 8 8 8 display to show the users score and then a number at the end out of 8 for more visual effectiveness */}
        <p className="my-auto ml-4 text-base font-bold text-yellow-300">?/8</p>
      </div>
    </div>
  );
}

export default Rating;
