import { useEffect, useState } from 'react';

/**
 *
 * @param {*} authUser User that is logged in/authenticated.
 * @param {*} userId User that is being followed.
 * @returns Object that contains state of the user profile being followed such as following and followed data.
 */
export default function useFollow(authId, userId, setError) {
  /**
   * State to keep track of whether the user is following the user profile being viewed.
   */
  const [followingData, setFollowingData] = useState(null);
  const [followerData, setFollowerData] = useState(null);

  // check if the user is following the user profile being viewed


  /**
   * Effect to run when the component mounts so we can display if the user is following the user already or not.
   */
  useEffect(() => {
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
        }
        else{
          setError('Error fetching User data from the server'); // set error to display to user
        }
      } catch (error) {
        setError(error.message);
        console.error(
          'Error fetching following data:',
          error,
        );
      }
    }

    async function fetchFollowedData() {
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
        }
        else{
          // response !ok, then do the following
          setFollowerData(null); // data is null, will use '-' in case this is null
          setError('Error fetching User data from the server'); // set the error status
        }
      } catch (error) {
        setError(error.message);
        console.error(
          'Error fetching following data:',
          error,
        );
      }
    }
    fetchFollowingData();
    fetchFollowedData();
  }, [userId]);

  /**
   * Function to handle following a user.
   * @param {number} userId - The id of the user to follow.
   */
  const handleFollowUser = async (userId) => {
    try {
      // make request to follow user
      console.log('Following user with id:', userId);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollowUser = async () => {
    // make request to unfollow user: userId
  };

  return {
    handleFollowUser,
    handleUnfollowUser,
  };
}
