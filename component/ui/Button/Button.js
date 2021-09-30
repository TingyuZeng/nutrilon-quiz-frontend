import classNames from "../../../lib/classNames";
import classes from "./Button.module.scss";

const Button = (props) => {
  const {
    onClick = null,
    children,
    color = "gold",
    size = "l",
    className = "",
    active = true,
  } = props;

  return (
    <button
      className={classNames(
        classes.btn,
        classes[color] || classes.gold,
        classes[size] || classes.l,
        active ? classes.convex : classes.concave,
        className
      )}
      onClick={onClick}
    >
      {children ? children : "确认"}
    </button>
  );
};

export default Button;
