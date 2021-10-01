import { useEffect, useRef } from "react";
import shuffle from "../../../lib/shuffle";
import Img from "../Image/Img";
import classes from "./Bg.module.scss";

const defaultBg = {
  width: 750,
  height: 1624,
  blurDataURL:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAIAAAArjXluAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJUlEQVQImWPIqW4saulh+Pzz17f//xku3Hv28tM3hqDEJAZOKQDrGA9imORcewAAAABJRU5ErkJggg==",
  src: "https://res.cloudinary.com/npc2021/image/upload/v1631793369/bg_landing_90a0720ec7.png",
  type: "png",
};

const Bg = ({ bgProps = defaultBg, stretch = true }) => {
  if (stretch) {
    bgProps.width = null;
    bgProps.height = null;
    bgProps.layout = "fill";
    bgProps.objectFit = "fill";
  } else {
    bgProps.layout = null;
    bgProps.objectPosition = "top";
  }

  return <Img {...bgProps} className={classes.bg} data-background-image />;
};

export default Bg;
