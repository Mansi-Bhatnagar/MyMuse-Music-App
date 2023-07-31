import { NavLink } from "react-router-dom";
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
        >
          <img src={home} />
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          <img src={search} />
        </NavLink>
        <NavLink
          to="/fav"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          <img src={fav} />
        </NavLink>
        <NavLink
          to="/category"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          <img src={category} />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
