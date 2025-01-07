import React from "react";

function Spinner({ className }) {
  return (
    <div className={className}>
      <span className="font-extrabold italic animate-spin">8</span>
    </div>
  );
}

export default Spinner;
