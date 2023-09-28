import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetArtistOverviewByIdQuery } from "../../Redux/Services/spotifyApi";
import Scrollbar from "../Scrollbar/Scrollbar";
import Skeleton from "react-loading-skeleton";
import TracksCard from "../Tracks/TracksCard";
import AlbumsCard from "../Albums/AlbumsCard";
import classes from "./ArtistDetail.module.css";
const ArtistDetail = () => {
  let { id } = useParams();
  const {
    data: overviewData,
    isFetching: overviewFetching,
    error: overviewError,
  } = useGetArtistOverviewByIdQuery(id);
  const [headerImage, setHeaderImage] = useState();
  const [name, setName] = useState("");
  const [listeners, setListeners] = useState("");
  const [tracks, setTracks] = useState();
  const [albumData, setAlbumData] = useState();
  const albumWrapper = {
    display: "flex",
    alignItems: "center",
    maxWidth: "calc(100vw - 60px)",
    overflowX: "scroll",
    scrollBehavior: "smooth",
    marginLeft: "100px",
    marginRight: "100px",
    marginBottom: "80px",
  };
  const tracksWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "calc(100vw - 60px)",
    maxHeight: "245px",
    overflowX: "scroll",
    scrollBehavior: "smooth",
    marginLeft: "100px",
    marginRight: "100px",
  };
  useEffect(() => {
    if (!overviewFetching && overviewData) {
      setHeaderImage(
        overviewData.data.artist.visuals.headerImage.sources[0].url
      );
      setName(overviewData.data.artist.profile.name);
      setListeners(overviewData.data.artist.stats.monthlyListeners);
      setTracks(
        overviewData.data.artist.discography.topTracks.items.map((item) => {
          return (
            <TracksCard
              key={item?.track?.id}
              id={item?.track?.id}
              name={item?.track?.name}
              image={item?.track?.album?.coverArt?.sources[1]?.url}
              artists={item?.track?.artists?.items
                .map((artist) => artist?.profile?.name)
                ?.join(", ")}
              style={{ width: "350px" }}
            />
          );
        })
      );
      setAlbumData(
        overviewData.data.artist.discography.albums.items.map((elem) => {
          return (
            <AlbumsCard
              key={elem.releases.items[0].id}
              image={elem.releases.items[0].coverArt.sources[0].url}
              name={elem.releases.items[0].name}
              label={elem.releases.items[0].label}
              date={elem.releases.items[0].date.year}
            />
          );
        })
      );
    }
  }, [overviewData, overviewFetching]);
  const showSkeleton = (number, width, height, borderRadius) => {
    return (
      <>
        {Array(number)
          .fill()
          .map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: width,
                  borderRadius: borderRadius,
                  height: height,
                  margin: "10px",
                }}
              >
                <Skeleton
                  height={height}
                  baseColor={"#212529b2"}
                  highlightColor="#6c757d"
                />
              </div>
            );
          })}
      </>
    );
  };

  if (overviewError) console.log(overviewError);
  return (
    <div className={classes.container}>
      {overviewFetching ? (
        showSkeleton(1, "calc(100vw - 80px)", "60vh", 0)
      ) : (
        <>
          <div
            className={classes.headerImage}
            style={{ backgroundImage: `url(${headerImage})` }}
          ></div>
          <div className={classes.overlay}>
            <h1>{name}</h1>
            <h4>{listeners.toLocaleString("en-US")} monthly listeners</h4>
          </div>
        </>
      )}

      <h3>Songs</h3>
      <Scrollbar
        leftAmount={-350}
        rightAmount={350}
        wrapperStyle={tracksWrapper}
        styleLeft={{ position: "absolute", right: "90px", top: "-20px" }}
        styleRight={{ position: "absolute", right: "70px", top: "-20px" }}
      >
        {overviewFetching ? showSkeleton(6, "350px", "75px", "8px") : tracks}
      </Scrollbar>

      <h3>Popular Albums</h3>
      <Scrollbar
        leftAmount={-540}
        rightAmount={540}
        wrapperStyle={albumWrapper}
        styleLeft={{ position: "absolute", right: "90px", top: "-20px" }}
        styleRight={{ position: "absolute", right: "70px", top: "-20px" }}
      >
        {overviewFetching
          ? showSkeleton(5, "250px", "320px", "8px")
          : albumData}
      </Scrollbar>
    </div>
  );
};

export default ArtistDetail;
