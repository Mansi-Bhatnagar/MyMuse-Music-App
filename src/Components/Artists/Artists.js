import ArtistCard from "./ArtistCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetArtistsByIdQuery } from "../../Redux/Services/spotifyApi";
import Skeleton from "react-loading-skeleton";
import classes from "./Artists.module.css";
const Artists = () => {
  const location = useLocation();
  let ids =
    "7H55rcKCfwqkyDFH9wpKM6,5wFpshVjY4ntIbIRNDJ5pj,1Cd373x8qzC7SNUg5IToqp,7vk5e3vY1uw9plTHJAMwjN,02yssJvjMJdJ3nueVhig4j";
  if (location.pathname === "/allArtists")
    ids =
      "7H55rcKCfwqkyDFH9wpKM6,5wFpshVjY4ntIbIRNDJ5pj,1Cd373x8qzC7SNUg5IToqp,7vk5e3vY1uw9plTHJAMwjN,02yssJvjMJdJ3nueVhig4j,04gDigrS5kc9YWfZHwBETP,7zyObVag8rUjItn71SkIrh,5JZ7CnR6gTvEMKX4g70Amv,4dM6NDYSfLcspt8GLoT5aE,5IH6FPUwQTxPSXurCrcIov";
  const [artists, setArtists] = useState();
  const navigate = useNavigate();
  const allClickHandler = () => {
    navigate("/allArtists");
  };
  const {
    data: artistData,
    isFetching: artistFetching,
    error: artistError,
  } = useGetArtistsByIdQuery(ids);
  useEffect(() => {
    if (!artistFetching && artistData) {
      setArtists(
        artistData.artists?.map((elem) => {
          return (
            <ArtistCard
              key={elem.id}
              name={elem.name}
              followers={elem.followers?.total}
              image={elem.images[1]?.url}
              width="200px"
              height="200px"
              style={{ margin: "30px" }}
              id={elem.id}
            />
          );
        })
      );
    }
  }, [artistData, artistFetching]);
  if (artistError) console.log(artistError);
  const showSkeleton = () => {
    return (
      <>
        {Array(location.pathname === "/allArtists" ? 10 : 5)
          .fill()
          .map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "200px",
                  borderRadius: "8px",
                  height: "200px",
                  margin: "30px",
                }}
              >
                <Skeleton
                  height={200}
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
      <h3>Popular Artists</h3>
      <div className={classes.artistCon}>
        {artistFetching ? showSkeleton() : artists}
      </div>
      {!artistFetching && location.pathname !== "/allArtists" && (
        <button className={classes.exploreBtn} onClick={allClickHandler}>
          <span>Explore All</span>
        </button>
      )}
    </div>
  );
};

export default Artists;
