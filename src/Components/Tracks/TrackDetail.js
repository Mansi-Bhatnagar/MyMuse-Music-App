import {
  useGetTrackByIdQuery,
  useGetLyricsByIdQuery,
  useGetArtistsByIdQuery,
} from "../../Redux/Services/spotifyApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { audioActions } from "../../Redux/AudioSlice";
import Skeleton from "react-loading-skeleton";
import ArtistCard from "../Artists/ArtistCard";
import classes from "./TrackDetail.module.css";
const TrackDetail = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: trackData,
    isFetching: trackFetching,
    error: trackError,
  } = useGetTrackByIdQuery(id);
  const [image, setImage] = useState();
  const [artistsId, setArtistsId] = useState();
  useEffect(() => {
    dispatch(audioActions.getUrl(null));
  }, []);

  useEffect(() => {
    if (!trackFetching && trackData) {
      setImage(trackData?.tracks[0]?.album?.images[0]?.url);
      setArtistsId(trackData?.tracks[0]?.artists?.map((artist) => artist.id));
      dispatch(
        audioActions.displayTrackImage(
          trackData?.tracks[0]?.album?.images[2]?.url
        )
      );
      dispatch(audioActions.displayTrackName(trackData?.tracks[0]?.name));
      dispatch(audioActions.getUrl(trackData?.tracks[0]?.preview_url));
      dispatch(audioActions.getId(id));
    }
  }, [trackFetching, trackData]);

  const {
    data: lyricsData,
    isFetching: lyricsFetching,
    error: lyricsError,
  } = useGetLyricsByIdQuery(id);

  const [trackLyrics, setTrackLyrics] = useState([]);

  useEffect(() => {
    if (!lyricsFetching && lyricsData) {
      setTrackLyrics(lyricsData?.lyrics?.lines);
    }
  }, [lyricsFetching, lyricsData]);

  const [artists, setArtists] = useState([]);
  const {
    data: artistData,
    isFetching: artistFetching,
    error: artistError,
  } = useGetArtistsByIdQuery(artistsId);

  useEffect(() => {
    if (
      !artistFetching &&
      artistData &&
      artistData.artists &&
      artistData.artists[0]
    ) {
      setArtists(
        artistData.artists?.map((elem) => {
          return (
            <ArtistCard
              key={elem.id}
              name={elem.name}
              followers={elem.followers?.total}
              image={elem.images[1]?.url}
              width="320px"
              height="320px"
              id={elem.id}
            />
          );
        })
      );
    }
  }, [artistData, artistFetching]);

  if (trackError || lyricsError || artistError) {
    console.log("Error");
  }

  const showSkeleton = () => {
    return (
      <>
        {Array(4)
          .fill()
          .map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "320px",
                  borderRadius: "8px",
                  height: "393px",
                  marginBottom: "20px",
                }}
              >
                <Skeleton
                  height={393}
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
      <div className={classes.details}>
        {trackFetching || lyricsFetching ? (
          <Skeleton
            baseColor={"#212529b2"}
            highlightColor="#6c757d"
            height={640}
            width={640}
          />
        ) : (
          <>
            <img src={image} alt="" />
            <div className={classes.overlay}>
              {trackLyrics?.map((elem, idx) => (
                <p key={idx}>{elem.words}</p>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={classes.artists}>
        <h3>Artists</h3>
        <div className={classes.artistCardContainer}>
          {trackFetching || lyricsFetching || artistFetching
            ? showSkeleton()
            : artists}
        </div>
      </div>
    </div>
  );
};

export default TrackDetail;
