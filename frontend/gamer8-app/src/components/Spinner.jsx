import React from "react";

function Spinner({ className }) {
  return (
    <div className={className + `animate-spin`}>
      <span className="font-extrabold italic">8</span>
    </div>
  );
}

export default Spinner;
