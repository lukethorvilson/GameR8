import React, { use, useContext } from 'react';
import Spinner from '../ui/Spinner';
import SearchedGameEntry from './SearchedGameEntry';
import { SearchContext } from '../../contexts/SearchContext';
import ContentHeader from '../ui/text/SearchContentHeading';
import useUserSearch from '../../hooks/useUserSearch';

function SearchedContentBox() {
  const {
    searchIsLoading,
    searchData,
    setSearchVal,
    dropDownVisible,
    resultBox,
  } = useContext(SearchContext);
  // const {userResults,
  //   userFetchLoading,
  //   userResultsCount} = useUserSearch(searchVal);
  return (
    <>
      <div
      ref={resultBox}
      role="region"
      aria-hidden={!dropDownVisible}
        className={`absolute left-0 mx-auto mt-4 w-screen overflow-hidden rounded bg-cyan-950 pb-10 transition-all duration-700 ${dropDownVisible ? 'max-h-[50vh] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {searchIsLoading && (
          <Spinner className="mx-auto mt-8 animate-spin text-6xl" />
        )}

        {!searchIsLoading && searchData?.length > 0 && (
          <div
            className={`mx-auto flex h-[90%] w-[90%] flex-row`}
          >
            <div className="mx-auto h-full flex-[3]">
              <ContentHeader text="Games" />
              <div
                id="game-content-container"
                className="mx-auto h-[40vh] w-[100%] overflow-y-scroll rounded-md border-l-2 border-r-2 border-yellow-300 px-2 py-2"
              >
                {searchData.map((game) => (
                  <SearchedGameEntry
                    key={game.id}
                    game={game}
                    setSearchVal={setSearchVal}
                  />
                ))}
              </div>
            </div>
            <div className="flex-[2] overflow-y-scroll">
              <ContentHeader
                text="Users"
              />
              <p>Nothing to see here yet</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchedContentBox;
