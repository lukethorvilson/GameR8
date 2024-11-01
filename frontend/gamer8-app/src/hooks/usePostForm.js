import { useEffect, useState } from 'react';

export default function usePostForm(user) {
  const [isAuth, setIsAuth] = useState(null);
  console.log(user);
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

  const [error, setError] = useState('');

  /**
   * The state of the posts body.
   */
  const [textArea, setTextArea] = useState('');

  /**
   * state for disabled comments on a users post
   */
  const [commentsDisabled, setCommentsDisabled] =
    useState(false);

  /**
   * state for disabled likes on a users post
   */
  const [likesDisabled, setLikesDisabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
  async function handleSubmit(e) {
    e.preventDefault();
    // return if not post content
    if (!textArea.length) {
      setError(
        'The post contained no text, please post something with content!',
      );
      return;
    }
    const post = {
      body: textArea,
      likesDisabled,
      commentsDisabled,
    };
    console.log(post);
    // do the api call
    try {
      setIsLoading(true);
      const response = await fetch(
        'http://localhost:8000/gamer8/api/v1/posts',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(post),
          credentials: 'include',
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
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
    isLoading,
    error,
  };
}
