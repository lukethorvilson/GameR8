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
  }, [userId]);
  return (
    <DropDown
      title="Recent Ratings"
      initHidden={true}
      render={ratings.map((rating) => (
        <div
          key={rating.id}
          className="flex h-[175px] w-[33%] flex-col rounded-md border-4 border-cyan-950 p-2"
        >
          <h4 className="font-base text-lg font-bold">
            Game Title:{" "}
            <span className="font-normal italic">{rating.gameName}</span>
          </h4>
          {rating?.title && (
            <h6 className="text-[12px] text-base">
              <span className="font-base font-bold">Title:</span> {rating.title}
            </h6>
          )}
          {rating?.rating && (
            <p className="font-base">
              R<span className="italic">8</span> Score:{" "}
              <span>{rating.rating}/8</span>
            </p>
          )}
          <div className="relative mt-2 h-[100%] font-base">
            <button
              onClick={() => navigate(`/game/${rating.gameId}`)}
              className="absolute bottom-0 right-0 h-fit w-fit rounded-lg bg-yellow-300 px-2 text-cyan-950"
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
