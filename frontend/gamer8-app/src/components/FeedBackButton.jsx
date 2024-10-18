import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
// import { useSnackbar } from "notistack";

function FeedBackButton({
  title,
  icon,
  rating,
  currentFeedback,
  setCurrentFeedback,
}) {
  //get the user from the context to check if the id is concurrent within any of the feedback data
  const { user, isLoading, hasAccess } = useContext(LoginContext);

  // if the title is the same as the users current feedback state then the user has clicked the button so it should he a darker shade
  const isClicked = currentFeedback === title;

  const [interactions, setInteractions] = useState(
    rating[`${title.toLowerCase()}`]?.length,
  );

  useEffect(() => {
    if (rating[title.toLowerCase()].includes(user?.id)) {
      setCurrentFeedback(title);
    }
  }, [rating, title, user, setCurrentFeedback]);

  // just need to handle the remove feedback in handle click
  async function handleClick() {
    if (isClicked) {
      // call api to remove current feedback through http://localhost:8000/gamer8/api/v1/ratings/${rating.id}/${rating.gameId}/${title.toLowerCase()}/remove
      try {
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/ratings/${rating.id}/${rating.gameId}/${title.toLowerCase()}/remove`,
          {
            method: "PATCH",
            credentials: "include",
          },
        );
        const data = await response.json();
      } catch (err) {
        console.log(err);
      }
      // need to set the currentFeedback to "None"
      setCurrentFeedback("None");
      // need to decrement the interactions
      setInteractions((curr) => {
        if (curr > 0) return curr - 1;
      });
    } else {
      try {
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/ratings/${rating.id}/${rating.gameId}/${title.toLowerCase()}/add`,
          {
            method: "PATCH",
            credentials: "include",
          },
        );
        const data = await response.json();
        if (response.ok) {
          // increment the interactions on screen
          setCurrentFeedback(title);
          setInteractions((curr) => curr + 1);
          // snack currently not working yet will play around with it more later
          // enqueueSnackbar(data.message, { autoHideDuration: 1500 });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <button
      onClick={handleClick}
      className={`rounded-2xl ${isClicked ? "bg-cyan-600 hover:bg-cyan-500" : "bg-cyan-200 hover:bg-cyan-400"} p-4 font-base text-cyan-950 ring-2 ring-yellow-300 hover:ring-4`}
    >
      {title} {icon} {`( ${interactions} )`}
    </button>
  );
}

export default FeedBackButton;
