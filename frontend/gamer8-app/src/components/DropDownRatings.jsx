import { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";

function DropDownRatings({ userId }) {
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUserRatings() {
      try {
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/users/${userId}/ratings?limit=3`,
          {
            method: "GET",
          },
        );
        const data = await response.json();
        setRatings(data.body.ratings);
      } catch (err) {
        console.log("Error❌: ", err.message);
      }
    }
    fetchUserRatings();
  }, []);
  return (
    <DropDown
      title="Recent Ratings"
      render={ratings.map((rating) => (
        <div
          key={rating.id}
          className="flex h-[125px] w-[30%] flex-col rounded-md border-4 border-cyan-950 p-2"
        >
          <h4 className="text-base font-bold">
            Game Title: <span className="italic">{rating.gameName}</span>
          </h4>
          {rating?.title && (
            <h6 className="text-[12px]">
              <span className="font-bold">Title:</span> {rating.title}
            </h6>
          )}
          {rating?.rating && (
            <p>
              R8 Score: <span>{rating.rating}/8</span>
            </p>
          )}
          <div className="mt-2">
            <button
              onClick={() => navigate(`/game/${rating.gameId}`)}
              className="h-fit w-fit rounded-lg bg-yellow-300 px-2 text-cyan-950"
            >
              Visit Game Page
            </button>
          </div>
        </div>
      ))}
    />
  );
}

export default DropDownRatings;
