import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useClickDetector from '../hooks/useClickDetector';
import useUserSearch from '../hooks/useUserSearch';
import { debounce } from 'lodash';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [dbSearchVal, setDbSearchVal] = useState(''); // value thats debounced so search bar doesn't request while user is typing
  const [searchVal, setSearchVal] = useState(''); // value that user is typing in search bar
  const [searchData, setSearchData] = useState([]); // data fetched from the api
  const [searchIsLoading, setSearchIsLoading] =
    useState(false);
  const [dropDownVisible, setDropDownVisible] =
    useState(false);
  const resultBox = useRef(null);

  const {userResults, userFetchLoading, userResultsCount} = useUserSearch(dbSearchVal);
  // Memoize the debounced function so it's created only once
  const debouncedSetDbSearchVal = useMemo(
    () => debounce((value) => setDbSearchVal(value), 500),
    [],
  );

  // updates the value to be searched every time the set
  const updateSearchVal = useCallback(
    (value) => {
      debouncedSetDbSearchVal(value); // Use the memoized debounced function
    },
    [debouncedSetDbSearchVal],
  );

  // Update dbSearchVal whenever searchVal changes
  useEffect(() => {
    if (searchVal || searchVal === '') {
      updateSearchVal(searchVal);
    }
  }, [searchVal, updateSearchVal]);

  // Fetch games data
  useEffect(() => {
    const fetchGames = async () => {
      if (!dbSearchVal) {
        setSearchData([]); // Empty search value should clear the data
        return;
      }

      searchIsLoading !== true && setSearchIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_RAWG_GAMES}?key=${import.meta.env.VITE_RAWG_API_KEY}&search=${dbSearchVal}`,
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const results = data.results.map((game) => ({
          id: game.id,
          image: game.background_image,
          name: game.name,
        }));

        searchIsLoading !== false &&
          setSearchIsLoading(false);
        setSearchData(results);
      } catch (err) {
        searchIsLoading !== false &&
          setSearchIsLoading(false);
        console.error('Fetch error: ', err);
      } finally {
        searchIsLoading !== false &&
          setSearchIsLoading(false);
      }
    };

    if (dbSearchVal) {
      fetchGames();
    }
  }, [dbSearchVal]);

  useClickDetector(resultBox, setDropDownVisible);

  // Effect to manage the result box expansion
  useEffect(() => {
    if (searchVal) {
      setSearchIsLoading(true);
      setDropDownVisible(true);
    } else {
      setSearchIsLoading(false);
      setDropDownVisible(false);
    }
  }, [searchVal]); // Effect to manage the result box height

  return (
    <SearchContext.Provider
      value={{
        dbSearchVal,
        setDbSearchVal,
        searchVal,
        setSearchVal,
        searchData,
        setSearchData,
        userResults,
        userFetchLoading,
        userResultsCount,
        searchIsLoading,
        setSearchIsLoading,
        dropDownVisible,
        resultBox,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
