import play from "../../Assets/play.svg";
import classes from "./TracksCard.module.css";
import { useNavigate } from "react-router-dom";
const TracksCard = (props) => {
  const { image, name, artists, id } = props;
  const navigate = useNavigate();
  const displayTrackHandler = () => {
    navigate(`/tracks/${id}`);
  };
  return (
    <div className={classes.container} onClick={displayTrackHandler}>
      <img src={image} />
      <img src={play} className={classes.play} />
      <div>
        <h4>{name}</h4>
        <h5>{artists}</h5>
      </div>
    </div>
  );
};

export default TracksCard;
