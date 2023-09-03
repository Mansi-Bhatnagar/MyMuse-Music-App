import { useState } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import play from "../../Assets/play_arrow_FILL0_wght400_GRAD0_opsz24.svg";
import pause from "../../Assets/pause_FILL0_wght400_GRAD0_opsz24.svg";
import fastForward from "../../Assets/fast_forward_FILL0_wght400_GRAD0_opsz24.svg";
import fastRewind from "../../Assets/fast_rewind_FILL0_wght400_GRAD0_opsz24.svg";
import favHollow from "../../Assets/favorite.svg";
import favFilled from "../../Assets/heart-solid.svg";
import classes from "./AudioPlayer.module.css";
import { useRef } from "react";
import { useEffect } from "react";
const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [favourite, setFavourite] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const trackImage = useSelector((state) => state.currAudio.trackImage);
  const trackName = useSelector((state) => state.currAudio.trackName);
  const url = useSelector((state) => state.currAudio.url);
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  const playHandler = () => {
    setIsPlaying((prev) => !prev);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };
  const favHandler = () => {
    setFavourite((prev) => !prev);
  };
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };
  const handleTimeUpdate = () => {
    progressBarRef.current.value = audioRef.current.currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
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
    if (url && audioRef?.current) {
      setIsPlaying(true);
      audioRef.current.play();
    }
    audioRef?.current?.addEventListener("ended", () => {
      setIsPlaying(false);
    });
  }, [url, audioRef]);
  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <img src={trackImage} alt="" />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <span>{trackName}</span>
          <a id="clickable" onClick={favHandler} data-tooltip-place="right">
            <img
              src={favourite ? favFilled : favHollow}
              alt=""
              style={{ width: favourite ? "20px" : "25px" }}
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
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
        >
          <source src={url} />
        </audio>
      )}
      <div className={classes.progressBar}>
        <input
          type="range"
          defaultValue="0"
          min={0}
          ref={progressBarRef}
          onChange={handleProgressChange}
        ></input>
      </div>
    </div>
  );
};

export default AudioPlayer;
