import Img from "../Image/Img";
import ProgressBar from "./ProgressBar";
import classes from "./LoaderDrop.module.scss";

const LoaderDrop = ({ loaderProps }) => {
  return (
    <div className={classes.wrapper}>
      <Img
        {...loaderProps}
        className={classes.loader}
        layout="fill"
        objectFit="contain"
      />
      <ProgressBar />
    </div>
  );
};

export default LoaderDrop;
