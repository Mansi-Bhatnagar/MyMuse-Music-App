import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetTrackByIdQuery } from "../Redux/Services/spotifyApi";
import classes from "./Favourites.module.css";
import Artists from "../Components/Artists/Artists";
import Albums from "../Components/Albums/Albums";
import TracksCard from "../Components/Tracks/TracksCard";
import { useEffect } from "react";
const Favourites = () => {
  const [tracks, setTracks] = useState();
  let favArtistsIds =
    JSON.parse(localStorage.getItem("artists"))?.join(",") || "";
  favArtistsIds =
    useSelector((state) => state.favourite.artists)?.join(",") || "";
  let favAlbumsIds =
    JSON.parse(localStorage.getItem("albums"))?.join(",") || "";
  favAlbumsIds =
    useSelector((state) => state.favourite.albums)?.join(",") || "";
  let favTracksIds =
    JSON.parse(localStorage.getItem("tracks"))?.join(",") || "";
  favTracksIds =
    useSelector((state) => state.favourite.tracks)?.join(",") || "";
  const {
    data: favTrackData,
    isFetching: favTrackFetching,
    error: favTrackError,
  } = useGetTrackByIdQuery(favTracksIds);
  useEffect(() => {
    if (!favTrackFetching && favTrackData) {
      setTracks(
        favTrackData?.tracks?.map((item) => {
          return (
            <TracksCard
              key={item?.id}
              id={item?.id}
              name={item?.name}
              image={item?.album?.images[2]?.url}
              artists={item?.artists?.map((artist) => artist?.name)?.join(",")}
            />
          );
        })
      );
    }
  }, [favTrackData, favTrackFetching]);
  if (favTrackError) console.log(favTrackError);
  return (
    <>
      {favArtistsIds ? (
        <Artists
          ids={favArtistsIds}
          number={favArtistsIds.split(",").length}
          title={"Favourite Artists"}
        />
      ) : (
        ""
      )}
      {favAlbumsIds ? (
        <Albums
          ids={favAlbumsIds}
          number={favAlbumsIds.split(",").length}
          title={"Favourite Albums"}
        />
      ) : (
        ""
      )}
      {favTracksIds ? (
        <div className={classes.container}>
          <h3>Favourite Tracks</h3>
          <div className={classes.tracksWrapper}>
            {favTrackFetching ? "" : tracks}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Favourites;
