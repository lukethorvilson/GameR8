import { useState } from "react";

function DropDown({ title,initHidden, render }) {
  const [hidden, setHidden] = useState(initHidden);
  return (
    <div
      id="dropdown-container"
      className={`mx-20 mt-4 flex w-[80%] flex-col ${hidden ? "border-b-[3px]" : "border-b-0"} border-yellow-300 transition-all`}
    >
      <div className="flex flex-row items-center gap-4">
        <h3 className="font-header text-2xl font-bold italic">{title}</h3>{" "}
        <button
          className="cursor-pointer text-xl"
          onClick={() => setHidden((curr) => !curr)}
        >
          {hidden ? <p>&#129123;</p> : <p>&#129121;</p>}
        </button>
      </div>
      <div
        id="content-container"
        className={`${hidden ? "hidden h-0" : ""} mt-4 flex flex-row gap-2 overflow-x-auto transition-all`}
      >
        {render}
      </div>
    </div>
  );
}

export default DropDown;
