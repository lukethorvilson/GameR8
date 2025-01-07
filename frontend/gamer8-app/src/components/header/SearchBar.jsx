import { useContext } from 'react';
import { SearchContext } from '../../contexts/SearchContext';

function SearchBar() {
  const {searchVal, setSearchVal} = useContext(SearchContext);
  return (
    <>
      <input
        className="ml-3 h-[50%] md:h-[60%] w-[90%] rounded-md border-0 bg-cyan-800 px-3 font-base text-yellow-300 placeholder-yellow-300 placeholder-opacity-80 ring-1 ring-yellow-300 ring-offset-2 focus:ring-2 focus:ring-yellow-300"
        placeholder="Search Game-title & Users"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      
    </>
  );
}

export default SearchBar;
