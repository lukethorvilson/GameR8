import React from 'react';

function SearchContentHeading({
  text,
  htmlForId,
}) {
  return (
    <h2 htmlFor={htmlForId} className="font-header text-left mb-4 ml-4 underline text-lg sm:text-xl font-semibold w-fit md:text-2xl lg:text-3xl text-primary-text-color">
      {text}
    </h2>
  );
}

export default SearchContentHeading;
