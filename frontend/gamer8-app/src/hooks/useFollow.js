import { useEffect, useState } from 'react';

/**
 *
 * @param {*} authUser User that is logged in/authenticated.
 * @param {*} userId User that is being followed.
 * @returns Object that contains state of the user profile being followed such as following and followed data.
 */
export default function useFollow(userId) {
  /**
   * State to keep track of whether the user is following the user profile being viewed.
   */
  const [followingData, setFollowingData] = useState(null);
  const [followedData, setFollowedData] = useState(null);
  const [error, setError] = useState('');

  // check if the user is following the user profile being viewed
  const [isFollowing, setIsFollowing] = useState(false);

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
          console.log('User data fetched successfully');
        }
        else{
          setIsFollowing(false);
          setError('Error fetching User data from the server');
        }
        const data = await response.json();
        setFollowingData(data.data?.following);
        console.log('Following data:', followingData);
      } catch (error) {
        setError(error.message);
        console.error(
          'Error fetching following data:',
          error,
        );
      }
    }
    // async function fetchFollowedData() {
    //   try {
    //     // make request to get followed data
    //     console.log('Fetching followed data');
    //   } catch (error) {
    //     setError(error.message);
    //     console.error(
    //       'Error fetching followed data:',
    //       error,
    //     );
    //   }
    // }
    fetchFollowingData();
    // fetchFollowedData();
  }, [followingData, userId]);

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
    isFollowing,
  };
}
