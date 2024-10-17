import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
import DropDown from "../components/DropDown";

function ProfilePage() {
  const { id: userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(profileData);
  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/users/${userId}`,
          {
            method: "GET",
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
  }, []);
  return (
    <div className="h-fit w-full">
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
      {error !== "" && <p>{error}</p>}
      {!isLoading && !error && profileData && (
        <div className="flex h-screen w-screen flex-col bg-cyan-800 text-yellow-300">
          <div
            id="name-container"
            className="my-4 flex h-[100px] flex-row content-start items-center gap-8 px-28 py-3"
          >
            <FaRegUserCircle
              onClick={() => {
                navigate(`/profile/${user.id}`);
              }}
              className="text-[75px] text-yellow-300"
            />
            <div className="flex flex-col">
              <h1 className="text-4xl font-extrabold italic text-yellow-300">
                {profileData?.fullName}
              </h1>
              <h4 className="text-xl italic text-yellow-300">
                @{profileData?.username}
              </h4>
            </div>
          </div>
          <div id="bio-container" className="mb-6 flex px-28">
            <p>{profileData?.biography}</p>
          </div>
          <div
            id="friend-button-container"
            className="mb-8 ml-28 flex content-start"
          >
            <button className="inline-flex h-fit w-fit items-center gap-2 rounded-xl bg-yellow-300 px-4 py-1 text-xl font-semibold text-cyan-950 transition-colors hover:bg-yellow-400">
              <IoAddCircle className="text-[28px]" />
              <p>Add Friend</p>
            </button>
          </div>
          <DropDown title="Favorite Games" />
          <DropDown title="Recent Posts" />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
