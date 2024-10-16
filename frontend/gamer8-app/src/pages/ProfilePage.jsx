import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { id: userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(profileData)
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
        setProfileData(data.body?.user );
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
    <div className="-z-10 h-fit w-full">
      {isLoading && (
        <div className="flex h-screen w-screen items-center justify-center bg-cyan-800">
          <div className="flex h-16 w-16 animate-spin items-center justify-center">
            <h1 className="bold text-7xl font-extrabold italic text-yellow-300">
              8
            </h1>
          </div>
        </div>
      )}
      {error !== "" && <p>{error}</p>}
      {!isLoading && !error && (
        <div className="flex h-screen w-screen items-center justify-center bg-cyan-800 text- text-yellow-300">Welcome to the profile of {profileData.fullName}</div>
      )}
    </div>
  );
}

export default ProfilePage;
