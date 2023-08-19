import { useEffect, useState } from "react";
import {
  useGetAlbumMetadataByIdQuery,
  useGetAlbumTracksByIdQuery,
} from "../../Redux/Services/spotifyApi";
import { useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import favHollow from "../../Assets/favorite.svg";
import favFilled from "../../Assets/heart-solid.svg";
import clock from "../../Assets/clock.svg";
import Skeleton from "react-loading-skeleton";
import AlbumTrackList from "./AlbumtrackList";
import classes from "./AlbumDetail.module.css";
const AlbumDetail = () => {
  let { id } = useParams();
  const [image, setImage] = useState();
  const [backgroundColor, setBackgroundColor] = useState();
  const [type, setType] = useState();
  const [name, setName] = useState();
  const [artists, setArtists] = useState();
  const [year, setYear] = useState();
  const [count, setCount] = useState();
  const [favourite, setFavourite] = useState(false);
  const [trackList, setTrackList] = useState();
  const {
    data: albumData,
    isFetching: albumFetching,
    error: albumError,
  } = useGetAlbumMetadataByIdQuery(id);
  const {
    data: trackData,
    isFetching: trackFetching,
    error: trackError,
  } = useGetAlbumTracksByIdQuery({ id, limit: 15 });
  const favHandler = () => {
    setFavourite((prev) => !prev);
  };
  useEffect(() => {
    if (!albumFetching && albumData) {
      setImage(albumData.data.album.coverArt.sources[0].url);
      setBackgroundColor(
        albumData.data.album.coverArt.extractedColors.colorRaw.hex
      );
      setType(albumData.data.album.type);
      setName(albumData.data.album.name);
      setArtists(
        albumData.data.album.artists.items
          .map((artist) => {
            return artist.profile.name;
          })
          ?.join(", ")
      );
      setYear(albumData.data.album.date.isoString.slice(0, 4));
      setCount(albumData.data.album.tracks.totalCount);
    }
  }, [albumFetching, albumData]);
  useEffect(() => {
    if (!trackFetching && trackData) {
      setTrackList(
        trackData.data.album.tracks.items.map((track, index) => {
          return (
            <AlbumTrackList
              key={track.track.uri.slice(14)}
              id={track.track.uri.slice(14)}
              index={index + 1}
              name={track.track.name}
              play={Number(track.track.playcount).toLocaleString("en-US")}
              duration={(
                track.track.duration.totalMilliseconds / 60000
              ).toFixed(2)}
            />
          );
        })
      );
    }
  }, [trackData, trackFetching]);
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
  if (albumError) console.log(albumError);
  if (trackError) console.log(trackError);

  return (
    <div className={classes.container}>
      {albumFetching ? (
        showSkeleton(1, "100%", "45vh", 0)
      ) : (
        <figure
          style={{
            margin: "0",
            background: backgroundColor,
            background: `linear-gradient(270deg, ${backgroundColor} 55%, hsla(206, 14%, 10%, 1) 100%)`,
            background: `-moz-linear-gradient(270deg, ${backgroundColor} 55%, hsla(206, 14%, 10%, 1) 100%)`,
            background: `-webkit-linear-gradient(270deg, ${backgroundColor} 55%, hsla(206, 14%, 10%, 1) 100%)`,
          }}
        >
          <img src={image} alt="" className={classes.albumImage} />
          <figcaption>
            <span>{type}</span>
            <h1>{name}</h1>
            <h4>
              {artists + ", "} {year + ", "} {count} songs
            </h4>
            <a id="clickable" onClick={favHandler} className={classes.favImage}>
              <img
                src={favourite ? favFilled : favHollow}
                alt=""
                style={{ width: favourite ? "25px" : "30px" }}
              />
            </a>
            <Tooltip
              anchorSelect="#clickable"
              clickable
              style={{ backgroundColor: "#fff", color: "#000" }}
            >
              Add to favourites
            </Tooltip>
          </figcaption>
        </figure>
      )}
      <div className={classes.heading}>
        <span>No.</span>
        <span>Title</span>
        <span>Plays</span>
        <span>
          <img src={clock} alt="" />
        </span>
      </div>
      <div className={classes.trackWrapper}>
        {!trackFetching && trackData && trackList}
      </div>
    </div>
  );
};

export default AlbumDetail;
