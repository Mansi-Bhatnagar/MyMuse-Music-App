import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import classes from "./Sidebar.module.css";
import home from "../../Assets/house-light.svg";
import search from "../../Assets/search.svg";
import fav from "../../Assets/favorite.svg";
import category from "../../Assets/category.svg";
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
          <img src={home} />
        </NavLink>
        <Tooltip id="home" style={{ backgroundColor: "#fff", color: "#000" }} />
        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          data-tooltip-id="Search"
          data-tooltip-content={"Search"}
          data-tooltip-place="right"
        >
          <img src={search} />
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
          <img src={fav} />
        </NavLink>
        <Tooltip
          id="Favourites"
          style={{ backgroundColor: "#fff", color: "#000" }}
        />
        <NavLink
          to="/category"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          data-tooltip-id="Category"
          data-tooltip-content={"Category"}
          data-tooltip-place="right"
        >
          <img src={category} />
        </NavLink>
        <Tooltip
          id="Category"
          style={{ backgroundColor: "#fff", color: "#000" }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
