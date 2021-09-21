import classes from "./Button.module.scss";

const Button = (props) => {
  const { onClick = null, children, color, size, className = "" } = props;

  const btnClass1 = color === "blue" ? classes.blue : classes.gold;
  const btnClass2 =
    size === "s"
      ? classes.small
      : size === "m"
      ? classes.middle
      : classes.large;
  const btnClasses = `${className} ${classes.btn} ${btnClass1} ${btnClass2}`;
  return (
    <button className={btnClasses} onClick={onClick}>
      {children ? children : "确认"}
    </button>
  );
};

export default Button;
