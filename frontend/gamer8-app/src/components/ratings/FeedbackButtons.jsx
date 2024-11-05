import React, { useState } from 'react';
import FeedBackButton from './FeedBackButton';

// will need a rating context

function FeedbackButtons({ rating }) {
  const [currentFeedback, setCurrentFeedback] = useState({
    helpful: 0,
    detailed: 0,
    entertaining: 0,
    unhelpful: 0,
  });
  return (
    <div
      id="feedback-container"
      className="my-auto flex h-[100px] flex-row items-center justify-center"
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
