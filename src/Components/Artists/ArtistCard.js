import { Tooltip } from "react-tooltip";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import favHollow from "../../Assets/favorite.svg";
import favFilled from "../../Assets/heart-solid.svg";
import classes from "./ArtistCard.module.css";
const ArtistCard = (props) => {
  const { name, image, followers, width, height, style, id } = props;
  const navigate = useNavigate();
  const displayArtistHandler = () => {
    navigate(`/artist/${id}`);
  };
  const [favourite, setFavourite] = useState(false);
  const favHandler = () => {
    setFavourite((prev) => !prev);
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
        <a id="clickable" onClick={favHandler}>
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
      </div>
      <p>Followers: {followers.toLocaleString("en-US")}</p>
    </div>
  );
};

export default ArtistCard;
