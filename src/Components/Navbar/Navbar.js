import classes from "./Navbar.module.css";
import logo from "../../Assets/appIcon1.jpg";
const Navbar = () => {
  let today = new Date();
  let curHr = today.getHours();
  let text;
  if (curHr < 12) {
    text = "Good Morning";
  } else if (curHr < 18) {
    text = "Good Afternoon";
  } else {
    text = "Good Evening";
  }

  return (
    <nav className={classes.container}>
      <div>
        <h3>{text}</h3>
        <img src={logo} alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
