import { useNavigate } from "react-router-dom";
import play from "../../Assets/play.svg";
import classes from "./AlbumsCard.module.css";
const AlbumsCard = (props) => {
  const { image, name, label, date, id } = props;
  const navigate = useNavigate();
  const displayAlbumHandler = () => {
    navigate(`/album/${id}`);
  };
  return (
    <div className={classes.container} onClick={displayAlbumHandler}>
      <img src={image} className={classes.albumImg} alt="" />
      <img src={play} className={classes.player} alt="" />
      <div className={classes.info}>
        <h4>
          {name} ( {label} )
        </h4>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default AlbumsCard;
