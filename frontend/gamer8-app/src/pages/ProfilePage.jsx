import React, { useEffect, useRef, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoAddCircle } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import DropDown from '../components/profilepage/DropDown';
import DropDownRatings from '../components/profilepage/DropDownRatings';
import useLoggedUser from '../hooks/useLoggedUser';
import Button from '../components/ui/buttons/Button';
import Modal from '../components/ui/modals/Modal';
import useFollow from '../hooks/useFollow';

function ProfilePage() {
  const { id: userId } = useParams(); // get the user id from the url
  const {
    handleFollowUser,
    handleUnfollowUser,
    isFollowing,
  } = useFollow(userId); // hook to handle following/unfollowing a user
  const [profileData, setProfileData] = useState(null); // store the user data to display
  
  const [error, setError] = useState(''); // store any error that occurs, display to screen
  const [isLoading, setIsLoading] = useState(false); // loading state

  const [showModal, setShowModal] = useState(false); // state of modal opened/closed
  const outletContainer = useRef(null); // reference to the outlet container for modal blur effect
  const [, user] = useLoggedUser();
  const navigate = useNavigate();
  const sameUser = +userId === +user?.id; // check if the user is the same as the logged in user
  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/users/${userId}`,
          {
            method: 'GET',
          },
        );
        const data = await response.json();
        setProfileData(data.body?.user);
        setIsLoading(false);
        console.log(data);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    }
    fetchUser();
  }, [userId]);
  return (
    <div
      id="outlet-container"
      ref={outletContainer}
      className="h-fit w-full"
    >
      {showModal && (
        <Modal
          modalTitle={'Edit Profile'}
          showModel={showModal}
          setShowModal={setShowModal}
          outletContainer={outletContainer}
        />
      )}
      {isLoading ||
        (!profileData && (
          <div className="flex h-screen w-screen items-center justify-center bg-cyan-800">
            <div className="flex h-16 w-16 animate-spin items-center justify-center">
              <h1 className="bold text-7xl font-extrabold italic text-yellow-300">
                8
              </h1>
            </div>
          </div>
        ))}
      {error !== '' && <p>{error}</p>}
      {!isLoading && !error && profileData && (
        <div className="flex h-screen w-screen flex-col bg-cyan-800 text-yellow-300">
          <div className="flex w-full flex-row">
            <div
              id="name-container"
              className="relative my-4 flex h-[100px] flex-[4] flex-row content-start items-center gap-8 px-28 py-3"
            >
              <FaRegUserCircle
                onClick={() => {
                  navigate(`/profile/${user.id}`);
                }}
                className="text-[75px] text-yellow-300"
              />
              <div className="flex flex-col">
                <h1 className="font-base text-4xl font-extrabold italic text-yellow-300">
                  {profileData?.fullName}
                </h1>
                <h4 className="text-xl italic text-yellow-300">
                  @{profileData?.username}
                </h4>
              </div>
            </div>
            <div className="flex flex-[1] items-center justify-center">
              {sameUser && (
                <Button
                  Icon={MdEdit}
                  onClick={() => setShowModal(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
          <div
            id="bio-container"
            className="mb-6 flex px-28"
          >
            <p>{profileData?.biography}</p>
          </div>
          {!sameUser && (
            <div
              id="friend-button-container"
              className="mb-4 ml-28 flex h-[10vh] w-[100vw] justify-start items-center"
            >
              <Button Icon={IoAddCircle}>
                <p className="font-base">Follow</p>
              </Button>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <DropDown
              title="Favorite Games"
              initHidden={true}
            />
            <DropDownRatings userId={profileData?.id} />
            <DropDown
              title="Recent Posts"
              initHidden={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
