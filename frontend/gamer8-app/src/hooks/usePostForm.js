import { useEffect, useState } from 'react';

export default function usePostForm(user) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    if (!user) {
      setIsAuth(false);
      return;
    }
    const containsUser = Object.entries(user)?.length
      ? true
      : false;
    if (containsUser) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [user]);

  /**
   * The state of the posts body.
   */
  const [textArea, setTextArea] = useState("");

  /**
   * state for disabled comments on a users post
   */
  const [commentsDisabled, setCommentsDisabled] =
    useState(false);

  /**
   * state for disabled likes on a users post
   */
  const [likesDisabled, setLikesDisabled] = useState(false);

  /**
   * Handles when a user wants to disable comments on their post
   */
  function handleDisableComments() {
    setCommentsDisabled((val) => !val);
  }

  /**
   * Handles when a user wants to disable likes on their post
   */
  function handleDisableLikes() {
    setLikesDisabled((val) => !val);
  }

  /**
   * Handles the sending the data to the server to verify and create for the database.
   */
  async function handleSubmit() {
    console.log('Post submitted!');
  }

  return {
    commentsDisabled,
    likesDisabled,
    textArea,
    setTextArea,
    handleDisableComments,
    handleDisableLikes,
    handleSubmit,
    isAuth,
  };
}
