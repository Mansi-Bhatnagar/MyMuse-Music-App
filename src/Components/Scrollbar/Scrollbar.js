import useSmoothHorizontalScroll from "use-smooth-horizontal-scroll";
import left from "../../Assets/chevron-left.svg";
import right from "../../Assets/chevron-right.svg";
import classes from "./Scrollbar.module.css";
const Scrollbar = (props) => {
  const { leftAmount, rightAmount, wrapperStyle, styleLeft, styleRight } =
    props;
  const { scrollTo, isAtStart, isAtEnd, scrollContainerRef, handleScroll } =
    useSmoothHorizontalScroll();
  const leftScrollHandler = () => {
    scrollTo(leftAmount);
  };
  const rightScrollHandler = () => {
    scrollTo(rightAmount);
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        src={left}
        onClick={leftScrollHandler}
        style={{
          filter: isAtStart ? "invert(0)" : "invert(1)",
          cursor: "pointer",
          ...styleLeft,
        }}
        alt=""
      />
      <img
        src={right}
        onClick={rightScrollHandler}
        style={{
          filter: isAtEnd ? "invert(0)" : "invert(1)",
          cursor: "pointer",
          ...styleRight,
        }}
        alt=""
      />
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        style={wrapperStyle}
        className={classes.wrapper}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Scrollbar;
