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

  const btnClass1 = COLORS[color];
  const btnClass2 = SIZES[size.toLowerCase()];

  const btnClasses = `${className} ${classes.btn} ${btnClass1} ${btnClass2}`;
  return (
    <button className={btnClasses} onClick={onClick}>
      {children ? children : "确认"}
    </button>
  );
};

export default Button;
