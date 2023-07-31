import Tracks from "../Components/Tracks/Tracks";
import classes from "./Home.module.css";
const Home = () => {
  return (
    <div className={classes.container}>
      <Tracks />
    </div>
  );
};

export default Home;
