import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetTopFiftyTracksQuery } from "../../Redux/Services/spotifyApi";
import Skeleton from "react-loading-skeleton";
import TracksCard from "./TracksCard";
import classes from "./Tracks.module.css";
const Tracks = (props) => {
  let { limit, id, title, path } = props;
  const location = useLocation();
  if (location.pathname === "/allTracks") {
    limit = 51;
    id = "4nNVfQ9eWidZXkBKZN5li4";
  }
  if (location.pathname === "/allOldClassics") {
    limit = 99;
    id = "41vFrXQsGWLHn0ZjbcBj2C";
  }
  const { data, isFetching, error } = useGetTopFiftyTracksQuery({
    limit,
    id,
  });
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();
  const allClickHandler = () => {
    navigate(path);
  };
  useEffect(() => {
    if (!isFetching && data) {
      setTracks(
        data.items.map((item) => {
          return (
            <TracksCard
              key={item.track.id}
              id={item.track.id}
              name={item.track.name}
              image={item.track.album.images[2].url}
              artists={item.track.artists
                .map((artist) => artist.name)
                ?.join(", ")}
            />
          );
        })
      );
    }
  }, [isFetching, data]);
  if (error) {
    console.log(error);
  }
  const showSkeleton = () => {
    return (
      <>
        {Array(limit)
          .fill()
          .map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "350px",
                  borderRadius: "8px",
                  height: "75px",
                  margin: "15px",
                }}
              >
                <Skeleton
                  height={75}
                  baseColor={"#212529b2"}
                  highlightColor="#6c757d"
                />
              </div>
            );
          })}
      </>
    );
  };
  return (
    <div className={classes.container}>
      <h3>{title}</h3>
      <div className={classes.tracksWrapper}>
        {isFetching ? showSkeleton() : tracks}
      </div>
      {!isFetching && location.pathname !== "/allTracks" && (
        <button className={classes.exploreBtn} onClick={allClickHandler}>
          <span>Explore All</span>
        </button>
      )}
    </div>
  );
};
export default Tracks;
// console.log(data.items[0].track.preview_url);
