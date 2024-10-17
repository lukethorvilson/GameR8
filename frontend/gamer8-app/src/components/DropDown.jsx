import { useState } from "react";

function DropDown({ title, render }) {
  const [hidden, setHidden] = useState(true);
  return (
    <div
      id="dropdown-container"
      className={`mx-20 mt-4 flex w-[80%] flex-col ${hidden ? "border-b-[3px]" : "border-b-0"} border-yellow-300 transition-all`}
    >
      <div className="flex flex-row items-center gap-4">
        <h3 className="text-2xl font-bold italic">{title}</h3>{" "}
        <button
          className="cursor-pointer text-xl"
          onClick={() => setHidden((curr) => !curr)}
        >
          {hidden ? <p>&#129123;</p> : <p>&#129121;</p>}
        </button>
      </div>
      <div
        id="content-container"
        className={`${hidden ? "hidden" : ""} flex flex-row gap-2 overflow-x-auto mt-4`}
      >
        {render}
      </div>
    </div>
  );
}

export default DropDown;
