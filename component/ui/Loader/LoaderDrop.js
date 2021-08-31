import Img from "../Image/Img";
import classes from "./LoaderDrop.module.scss";

const LoaderDrop = ({ loaderProps, bgProps }) => {
  return (
    <>
      <div className={classes.text}>Loading</div>
      <div className={classes.mask}>
        <Img {...loaderProps} className={classes.loader} />
      </div>
      <Img {...bgProps} className={classes.bg} />
    </>
  );
};

export default LoaderDrop;
