import React, { useState } from 'react';

function TabbedTable({ titles, content }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="mb-28 mt-2 flex max-h-fit w-[100dvw] flex-col gap-10">
      <div className="flex h-fit w-full flex-row items-center bg-cyan-950 px-10 py-2">
        {titles.map((tab, i, arr) => (
          <div
            key={i}
            onClick={() => setActiveTab(i)}
            className={`${i === activeTab ? 'bg-yellow-300 text-cyan-950 underline' : 'bg-cyan-900 text-yellow-300'} h-12 w-[50%] content-center text-center ${i === 0 && 'rounded-l-md'} ${i === arr.length - 1 && 'rounded-r-md'} my-auto cursor-pointer font-base transition-colors duration-300`}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="relative h-fit w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${activeTab * 100}%)`,
          }}
        >
          {content.map((el, i) => (
            <div key={i} className="w-full flex-shrink-0">
              {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabbedTable;
