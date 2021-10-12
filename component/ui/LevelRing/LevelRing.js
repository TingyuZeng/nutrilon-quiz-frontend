import { motion } from "framer-motion";
import classNames from "../../../lib/classNames";
import Button from "../Button/Button";
import Img from "../Image/Img";
import classes from "./LevelRing.module.scss";

const LEVELCOVERS = [
  "https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_1_0c0bad1164.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_2_249f115968.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_3_ff792ef78e.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_4_4d0a70795c.png",
];
const COLORS = {
  active: "blue",
  inactive: "gray",
  passed: "gold",
};

const LevelRing = ({
  src,
  level = 1,
  status = "active",
  custom = {},
  className,
  size,
  text,
}) => {
  size =
    typeof size === "number"
      ? `${size}px`
      : /\D/.test(size)
      ? size
      : `${size}px`;
  return (
    <motion.div
      className={classNames(classes.wrapper, classes[status], className)}
      initial={{ width: size, height: size, ...custom }}
    >
      <Img
        src={src ? src : LEVELCOVERS[level]}
        className={classes.level}
        layout="fill"
        objectFit="cover"
      />
      {text && (
        <Button
          size="s"
          color={COLORS[status]}
          active={status === "active" ? true : false}
          className={classes.btn}
        >
          {text}
        </Button>
      )}
    </motion.div>
  );
};

export default LevelRing;
