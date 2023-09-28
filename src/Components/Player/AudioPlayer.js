import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";
import { favouriteActions } from "../../Redux/FavouritesSlice";
import play from "../../Assets/play_arrow_FILL0_wght400_GRAD0_opsz24.svg";
import pause from "../../Assets/pause_FILL0_wght400_GRAD0_opsz24.svg";
import fastForward from "../../Assets/fast_forward_FILL0_wght400_GRAD0_opsz24.svg";
import fastRewind from "../../Assets/fast_rewind_FILL0_wght400_GRAD0_opsz24.svg";
import favHollow from "../../Assets/heart-hollow.svg";
import favFilled from "../../Assets/heart-filled.svg";
import classes from "./AudioPlayer.module.css";
const AudioPlayer = () => {
  let favTracks = [];
  const [isPlaying, setIsPlaying] = useState(true);
  const [favourite, setFavourite] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const dispatch = useDispatch();
  const progressBarRef = useRef();
  const trackImage = useSelector((state) => state.currAudio.trackImage);
  const trackName = useSelector((state) => state.currAudio.trackName);
  const url = useSelector((state) => state.currAudio.url);
  const id = useSelector((state) => state.currAudio.id);
  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioRef.current.duration);
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  const playHandler = () => {
    setIsPlaying((prev) => !prev);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => console.log(error));
    }
  };
  const favHandler = () => {
    setFavourite((prev) => {
      prev = !prev;
      if (prev) {
        favTracks = JSON.parse(localStorage.getItem("tracks")) || [];
        favTracks.push(id);
        localStorage.setItem("tracks", JSON.stringify(favTracks));
      } else {
        favTracks = JSON.parse(localStorage.getItem("tracks"))?.filter(
          (item) => item !== id
        );
        localStorage.setItem("tracks", JSON.stringify(favTracks));
      }
      dispatch(favouriteActions.tracksChanged(favTracks));
      return prev;
    });
  };
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };
  const handleTimeUpdate = () => {
    progressBarRef.current.value = audioRef.current.currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / Math.floor(duration)) * 100}%`
    );
  };
  const fastRewindHandler = () => {
    audioRef.current.currentTime =
      audioRef.current.currentTime - 5 > 0
        ? audioRef.current.currentTime - 5
        : 0;
  };
  const fastForwardHandler = () => {
    audioRef.current.currentTime += 5;
  };
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("tracks"))?.find((item) => item === id)
    ) {
      setFavourite(true);
    }
  }, [id]);
  useEffect(() => {
    if (url && audioRef?.current) {
      setIsPlaying(true);
      audioRef.current.play().catch((error) => console.log(error));
    }
    audioRef?.current?.addEventListener("ended", () => {
      setIsPlaying(false);
      progressBarRef.current.style.setProperty("--range-progress", "100%");
      progressBarRef.current.value = progressBarRef.current.max;
    });
  }, [url, audioRef]);
  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <img src={trackImage} alt="" className={classes.trackImage} />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <span>
            <p>{trackName}</p>
          </span>
          <a id="clickable" onClick={favHandler} data-tooltip-place="right">
            <img
              src={favourite ? favFilled : favHollow}
              alt=""
              className={classes.heart}
            />
          </a>
          <Tooltip
            anchorSelect="#clickable"
            clickable
            style={{ backgroundColor: "#fff", color: "#000" }}
          >
            Add to favourites
          </Tooltip>
        </div>
      </div>
      <div className={classes.controls}>
        <button onClick={fastRewindHandler}>
          <img src={fastRewind} alt="fastRewind" />
        </button>
        <button onClick={playHandler}>
          <img
            src={isPlaying ? pause : play}
            alt={isPlaying ? "pause" : "play"}
          />
        </button>
        <button onClick={fastForwardHandler}>
          <img src={fastForward} alt="fastForward" />
        </button>
      </div>
      {url && (
        <>
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
          >
            <source src={url} />
          </audio>
          <div className={classes.progressBar}>
            <input
              type="range"
              defaultValue="0"
              min={0}
              ref={progressBarRef}
              onChange={handleProgressChange}
            ></input>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
