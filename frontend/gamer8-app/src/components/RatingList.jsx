import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function RatingList({ gameId }) {
  useEffect(() => {
    async function fetchRatings() {
      try{
        const response = await fetch("")
      } catch(err){

      }
    }
  });
  return <div>ReviewList</div>;
}

export default RatingList;
