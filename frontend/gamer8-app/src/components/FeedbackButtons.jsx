import React, { useState } from "react";
import FeedBackButton from "./FeedBackButton";

function FeedbackButtons({ rating }) {
  const [currentFeedback, setCurrentFeedback] = useState("None");
  return (
    <div
      id="feedback-container"
      className="mx-48 my-6 flex flex-row justify-between"
    >
      <FeedBackButton
        title="Helpful"
        icon="🙌"
        rating={rating}
        currentFeedback={currentFeedback}
        setCurrentFeedback={setCurrentFeedback}
      />
      <FeedBackButton
        title="Detailed"
        icon="📖"
        rating={rating}
        currentFeedback={currentFeedback}
        setCurrentFeedback={setCurrentFeedback}
      />
      <FeedBackButton
        title="Entertaining"
        icon="😂"
        rating={rating}
        currentFeedback={currentFeedback}
        setCurrentFeedback={setCurrentFeedback}
      />
      <FeedBackButton
        title="Unhelpful"
        icon="😕"
        rating={rating}
        currentFeedback={currentFeedback}
        setCurrentFeedback={setCurrentFeedback}
      />
    </div>
  );
}

export default FeedbackButtons;
