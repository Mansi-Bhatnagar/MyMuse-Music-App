import { Tooltip } from "react-tooltip";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { favouriteActions } from "../../Redux/FavouritesSlice";
import favHollow from "../../Assets/heart-hollow.svg";
import favFilled from "../../Assets/heart-filled.svg";
import classes from "./ArtistCard.module.css";
const ArtistCard = (props) => {
  const { name, image, followers, width, height, style, id } = props;
  let favArtists = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState(false);
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("artists"))?.find((item) => item === id)
    ) {
      setFavourite(true);
    }
  }, []);
  const displayArtistHandler = () => {
    navigate(`/artist/${id}`);
  };
  const favHandler = (e) => {
    e.stopPropagation();
    setFavourite((prev) => {
      prev = !prev;
      if (prev) {
        favArtists = JSON.parse(localStorage.getItem("artists")) || [];
        favArtists.push(id);
        localStorage.setItem("artists", JSON.stringify(favArtists));
      } else {
        favArtists = JSON.parse(localStorage.getItem("artists")).filter(
          (item) => item !== id
        );
        localStorage.setItem("artists", JSON.stringify(favArtists));
      }
      dispatch(favouriteActions.artistsChanged(favArtists));
      return prev;
    });
  };
  return (
    <div
      className={classes.container}
      style={style}
      onClick={displayArtistHandler}
    >
      <img
        src={image}
        alt=""
        className={classes.artistImg}
        style={{ width: width, height: height }}
      />
      <div className={classes.info}>
        <h4>{name}</h4>
        <a id="clickable" onClick={favHandler} className={classes.heart}>
          <img src={favourite ? favFilled : favHollow} alt="" />
        </a>
        <Tooltip
          anchorSelect="#clickable"
          clickable
          style={{ backgroundColor: "#fff", color: "#000" }}
        >
          Add to favourites
        </Tooltip>
      </div>
      <p>Followers: {followers.toLocaleString("en-US")}</p>
    </div>
  );
};

export default ArtistCard;
