import { useEffect, useRef, useState } from "react";

const useGameRateForm = () => {
  const ratingForm = useRef(null);
  const ratingButton = useRef(null);
  const [formShown, setFormShown] = useState(false);
  let fadeTimeOut;
  function handleClickRating() {
    setFormShown((val) => !val);
  }

  useEffect(() => {
    if (ratingButton.current && ratingForm.current) {
      if (formShown) {
        ratingButton.current.classList.add("hidden");
        ratingForm.current.classList.add("animate-fadeIn");
        ratingForm.current.classList.add("flex");
        ratingForm.current.classList.add("flex-col");
        ratingForm.current.classList.remove("hidden");
      } else {
        clearTimeout(fadeTimeOut);
        ratingForm.current.classList.remove("animate-fadeIn");
        ratingForm.current.classList.add("animate-fadeOut");

        fadeTimeOut = setTimeout(() => {
          ratingForm.current.classList.add("hidden");
          ratingButton.current.classList.remove("hidden");
        }, 250);
      }
    }
    return () => clearTimeout(fadeTimeOut);
  }, [formShown]);

  return [ratingButton, ratingForm, handleClickRating];
};

export default useGameRateForm;
