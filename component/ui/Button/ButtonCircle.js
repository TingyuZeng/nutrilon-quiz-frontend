import classes from "./ButtonCircle.module.scss";

const ButtonCircle = ({ children, onClick = null }) => {
  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonCircle;
