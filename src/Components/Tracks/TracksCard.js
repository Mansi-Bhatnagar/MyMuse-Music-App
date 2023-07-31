import play from "../../Assets/play.svg";
import classes from "./TracksCard.module.css";
const TracksCard = (props) => {
  const { image, name, artists } = props;
  return (
    <div className={classes.container}>
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
