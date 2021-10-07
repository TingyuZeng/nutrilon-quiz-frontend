import { useEffect, useRef } from "react";
import { getBgProps } from "../../../lib/brandAssets";
import classNames from "../../../lib/classNames";
import shuffle from "../../../lib/shuffle";
import Img from "../Image/Img";
import classes from "./Bg.module.scss";

const Bg = ({ bgProps = getBgProps("default"), stretch = true, className }) => {
  if (stretch) {
    bgProps.width = null;
    bgProps.height = null;
    bgProps.layout = "fill";
    bgProps.objectFit = "fill";
  } else {
    bgProps.layout = null;
    bgProps.objectPosition = "top";
  }

  return (
    <Img
      {...bgProps}
      className={classNames(classes.bg, className)}
      data-background-image
    />
  );
};

export default Bg;
