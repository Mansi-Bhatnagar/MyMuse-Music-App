import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import classes from "./Sidebar.module.css";
import home from "../../Assets/house-light.svg";
import search from "../../Assets/search.svg";
import fav from "../../Assets/heart-hollow.svg";
const Sidebar = () => {
  return (
    <div className={classes.nav}>
      <div className={classes.links}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          data-tooltip-id="home"
          data-tooltip-content={"Home"}
          data-tooltip-place="right"
        >
          <img src={home} alt="" />
        </NavLink>
        <Tooltip id="home" style={{ backgroundColor: "#fff", color: "#000" }} />
        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          data-tooltip-id="Search"
          data-tooltip-content={"Search"}
          data-tooltip-place="right"
        >
          <img src={search} alt="" />
        </NavLink>
        <Tooltip
          id="Search"
          style={{
            backgroundColor: "#fff",
            color: "#000",
          }}
        />
        <NavLink
          to="/fav"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          data-tooltip-id="Favourites"
          data-tooltip-content={"Favourites"}
          data-tooltip-place="right"
        >
          <img src={fav} alt="" />
        </NavLink>
        <Tooltip
          id="Favourites"
          style={{ backgroundColor: "#fff", color: "#000" }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
