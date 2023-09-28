import { useState, useEffect } from "react";
import { useSearchQuery } from "../Redux/Services/spotifyApi";
import Artists from "../Components/Artists/Artists";
import TracksCard from "../Components/Tracks/TracksCard";
import classes from "./SearchResults.module.css";
import Albums from "../Components/Albums/Albums";
const SearchResults = (props) => {
  const searchTerm = String(props.searchTerm || " ");
  const [filteredSearchTerm, setFilteredSearchTerm] = useState(searchTerm);
  const [artists, setArtists] = useState("");
  const [tracks, setTracks] = useState("");
  const [albums, setAlbums] = useState("");
  const {
    data: searchData,
    isFetching: searchDataFetching,
    error: searchError,
  } = useSearchQuery({ limit: 6, query: filteredSearchTerm });
  useEffect(() => {
    if (!searchTerm.trim().length === 0) {
      setFilteredSearchTerm(searchTerm);
    }
  }, []);
  useEffect(() => {
    if (searchTerm.trim().length === 0 || searchTerm.trim().length > 3) {
      setFilteredSearchTerm(searchTerm);
    }
  }, [searchTerm]);
  useEffect(() => {
    if (!searchDataFetching && searchData) {
      setArtists(
        searchData?.artists?.items
          ?.map((item) => item?.data?.uri?.slice(15))
          ?.join(",")
      );
      setTracks(
        searchData?.tracks?.items?.map((item) => {
          return (
            <TracksCard
              key={item?.data?.id}
              id={item?.data?.id}
              name={item?.data?.name}
              image={item?.data?.albumOfTrack?.coverArt?.sources[1]?.url}
              artists={item?.data?.artists?.items
                ?.map((item) => item?.profile?.name)
                ?.join(", ")}
            />
          );
        })
      );
      setAlbums(
        searchData?.albums?.items
          ?.map((item) => item?.data?.uri?.slice(14))
          ?.join(",")
      );
    }
  }, [searchData, searchDataFetching]);
  if (searchError) console.log(searchError);

  return (
    <>
      {!searchDataFetching && searchData && artists && tracks && albums && (
        <div>
          <div className={classes.container}>
            <h3>Songs</h3>
            <div className={classes.tracksWrapper}>{tracks}</div>
          </div>
          <Artists ids={artists} title={"Artists"} number={5} showAll={false} />
          <Albums ids={albums} title={"Albums"} number={5} />
        </div>
      )}
    </>
  );
};

export default SearchResults;
