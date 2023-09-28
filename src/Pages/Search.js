import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import search from "../Assets/search1.svg";
import classes from "./Search.module.css";
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchedTerm = useDebounce(searchTerm, 500);
  return (
    <div className={classes.container}>
      <div className={classes.searchBar}>
        <img src={search} alt="search" />
        <input
          type="text"
          placeholder="Type here to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <SearchResults searchTerm={debouncedSearchedTerm} />
    </div>
  );
};
export default Search;
