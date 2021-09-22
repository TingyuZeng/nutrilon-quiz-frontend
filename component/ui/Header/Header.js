import classes from "./Header.module.scss";

const Header = ({ children, className }) => {
  return <div className={`${classes.wrapper} ${className}`}>{children}</div>;
};
export default Header;
