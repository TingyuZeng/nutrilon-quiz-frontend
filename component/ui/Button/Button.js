import classNames from "../../../lib/classNames";
import classes from "./Button.module.scss";

const COLORS = {
  blue: classes.blue,
  gold: classes.gold,
  white: classes.white,
};

const SIZES = {
  s: classes.small,
  m: classes.middle,
  l: classes.large,
};

const Button = (props) => {
  const {
    onClick = null,
    children,
    color = "gold",
    size = "l",
    className = "",
  } = props;

  return (
    <button
      className={classNames(
        classes.btn,
        COLORS[color] || classes.gold,
        SIZES[size.toLowerCase()] || classes.large,
        className
      )}
      onClick={onClick}
    >
      {children ? children : "确认"}
    </button>
  );
};

export default Button;
