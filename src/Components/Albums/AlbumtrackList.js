import { useNavigate } from "react-router-dom";
import classes from "./AlbumTrackList.module.css";
const AlbumList = (props) => {
  const { id, name, index, play, duration } = props;
  const navigate = useNavigate();
  const displayTrackHandler = () => {
    navigate(`/tracks/${id}`);
  };
  return (
    <div className={classes.container} onClick={displayTrackHandler}>
      <span>{index}</span>
      <span>{name}</span>
      <span>{play}</span>
      <span>{duration}</span>
    </div>
  );
};

export default AlbumList;
