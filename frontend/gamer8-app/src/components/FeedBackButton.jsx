import React, { useContext, useEffect } from 'react';
import { LoginContext } from '../contexts/LoginContext';
// import { useSnackbar } from "notistack";

function FeedBackButton({
  title,
  icon,
  rating,
  currentFeedback,
  setCurrentFeedback,
}) {
  //get the user from the context to check if the id is concurrent within any of the feedback data
  const { user } = useContext(LoginContext);

  // if the title is the same as the users current feedback state then the user has clicked the button so it should he a darker shade
  let isClicked =
    currentFeedback[title.toLowerCase()] === 1;

  useEffect(() => {
    if (rating[title.toLowerCase()]?.includes(user?.id)) {
      setCurrentFeedback((feedback) => ({
        ...feedback,
        helpful: 0,
        entertaining: 0,
        detailed: 0,
        unhelpful: 0,
        [title.toLowerCase()]: 1,
      }));
    }
  }, [rating, title, user, setCurrentFeedback]);

  // just need to handle the remove feedback in handle click
  async function handleClick() {
    if (isClicked) {
      // call api to remove current feedback through http://localhost:8000/gamer8/api/v1/ratings/${rating.id}/${rating.gameId}/${title.toLowerCase()}/remove
      try {
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/ratings/feedback/remove/${rating.id}/${rating.gameId}/${title.toLowerCase()}`,
          {
            method: 'PATCH',
            credentials: 'include',
          },
        );
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      // need to set the current states to all false since the user clicked to remove others
      setCurrentFeedback((feedback) => ({
        ...feedback,
        helpful: 0,
        entertaining: 0,
        detailed: 0,
        unhelpful: 0,
      }));
    } else {
      try {
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/ratings/feedback/add/${rating.id}/${rating.gameId}/${title.toLowerCase()}`,
          {
            method: 'PATCH',
            credentials: 'include',
          },
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          // increment the interactions on screen
          setCurrentFeedback((feedback) => ({
            ...feedback,
            helpful: 0,
            entertaining: 0,
            detailed: 0,
            unhelpful: 0,
            [title.toLowerCase()]: 1,
          }));
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
      className={`rounded-2xl ${isClicked ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-cyan-200 hover:bg-cyan-400'} mx-8 h-fit p-4 font-base text-[10px] text-cyan-950 ring-2 ring-yellow-300 hover:ring-4 sm:text-sm md:text-base`}
    >
      {title} {icon}{' '}
      {`( ${!rating[title.toLowerCase()]?.includes(user?.id) ? rating[title.toLowerCase()]?.length + currentFeedback[title.toLowerCase()] : rating[title.toLowerCase()]?.length} )`}
    </button>
  );
}

export default FeedBackButton;
