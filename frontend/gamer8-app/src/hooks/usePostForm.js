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
   *
   */
  function handleDisableLikes() {
    setLikesDisabled((val) => !val);
  }

  function handleSubmit() {
    console.log('Post submitted!');
  }

  return {
    commentsDisabled,
    likesDisabled,
    handleDisableComments,
    handleDisableLikes,
    handleSubmit,
    isAuth,
  };
}
