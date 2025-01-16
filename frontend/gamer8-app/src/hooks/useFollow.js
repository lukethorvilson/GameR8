import { useCallback, useEffect, useState } from 'react';

/**
 *
 * @param {*} authUser User that is logged in/authenticated.
 * @param {*} userId User that is being followed.
 * @returns Object that contains state of the user profile being followed such as following and followed data.
 */
export default function useFollow(
  authId,
  userId,
  setError,
) {
  /**
   * State to keep track of whether the user is following the user profile being viewed.
   */
  const [followingData, setFollowingData] = useState([]);
  const [followerData, setFollowerData] = useState([]);
  const [followLoading, setFollowLoading] = useState(false);

  // check if the authenticated user is following the user profile being viewed/ this controls button functionality
  let isFollowing = followerData.length > 0 && followerData?.some(
    (user) => +user?.id === +authId,
  );

  /**
   * This function checks if the IDs are numbers, if they are not, it returns false, no need to re-run if values never change after the function is created.
   */
   const isVerifiedIDs = useCallback(() => {
    if(Number.isNaN(authId) || Number.isNaN(userId)) return false;
    return true;
  }, [authId, userId]);
  /**
   * Effect to run when the component mounts so we can display if the user is following the user already or not.
   */
  useEffect(() => {
    /**
     * Function to fetch the following data of the user profile being viewed.
     * Returns a list of users that the user is following.
     */
    async function fetchFollowingData() {
      try {
        // make request to get following data of the user profile being viewed
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/users/following/${userId}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          // if response is ok, then do the following
          const data = await response.json(); // retrieve the data from the response
          setFollowingData(data?.data?.following); // set the following data
        } else {
          setError(
            'Error fetching User data from the server',
          ); // set error to display to user
        }
      } catch (err) {
        setError(err.message);
      }
    }

    /**
     * Function to fetch the follower data of the user profile being viewed.
     * Returns a list of the users that are following the user.
     */
    async function fetchFollowerData() {
      try {
        // make request to get follower data of the user profile being viewed
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/users/followers/${userId}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          // response ok, then do the following
          const data = await response.json(); // retreive the data from the response
          setFollowerData(data?.data?.followers); // set the follower data
        } else {
          // response !ok, then do the following
          setFollowerData(null); // data is null, will use '-' in case this is null
          setError(
            'Error fetching User data from the server',
          ); // set the error status
        }
      } catch (error) {
        setError(error.message);
        console.error(
          'Error fetching following data:',
          error,
        );
      }
    }

    // both IDs must be numbers, no objects, strings or anything else. They must match an id integer in the DB.
    if(!isVerifiedIDs()) return;
    // run if the IDs are verified
    fetchFollowingData();
    fetchFollowerData();
  }, [userId, authId, setError]);

  /**
   * Function to handle following a user.
   * @param {number} userId - The id of the user to follow.
   */
  const handleFollowUser = async (userId) => {
    if (!isVerifiedIDs()) {
      return;
    }
    try {
      setFollowLoading(true);
      // make request to follow the user: userId
      const response = await fetch(
        `http://localhost:8000/gamer8/api/v1/users/following/${userId}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        // if response is ok, then do the following
        const data = await response.json(); // retrieve the data from the response
        setFollowerData(data?.data?.updatedFollowers); // set the following data
      } else {
        setError(
          'Internal Server Error: Error following user.',
        ); // set error to display to user
      }
    } catch (error) {
      setError(error.message);
      console.error(
        'Error fetching following data:',
        error,
      );
    } finally {
      setFollowLoading(false);
    }
  };

  const handleUnfollowUser = async (userId) => {
    // check to make sure the IDs are numbers and not objects or strings
    if (!isVerifiedIDs()) {
      return;
    }
    // make request to un-follow user: userId
    try {
      // make request to follow the user: userId
      setFollowLoading(true);
      const response = await fetch(
        `http://localhost:8000/gamer8/api/v1/users/unfollowing/${userId}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        // if response is ok, then do the following
        const data = await response.json(); // retrieve the data from the response
        setFollowerData(data?.data?.updatedFollowers); // set the following data
      } else {
        setError(
          'Error fetching User data from the server',
        ); // set error to display to user
      }
    } catch (error) {
      setError(error.message);
      console.error(
        'Error fetching following data:',
        error,
      );
    } finally {
      setFollowLoading(false);
    }
  };

  return {
    followingData,
    followerData,
    handleFollowUser,
    handleUnfollowUser,
    isFollowing,
    followLoading,
  };
}
