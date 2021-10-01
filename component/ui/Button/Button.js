import classNames from "../../../lib/classNames";
import classes from "./Button.module.scss";

const Button = (props) => {
  const {
    onClick = null,
    children,
    color = "gold",
    size = "l",
    type = "rect",
    className = "",
    active = true,
    float = false,
    src,
    alt,
  } = props;

  return (
    <button
      className={classNames(
        classes[type] || classes.rect,
        classes[color] || classes.gold,
        classes[size] || classes.l,
        active ? classes.convex : classes.concave,
        float && classes.float,
        className
      )}
      onClick={onClick}
    >
      {children ? children : src ? <img src={src} alt={alt} /> : "确认"}
    </button>
  );
};

export default Button;
