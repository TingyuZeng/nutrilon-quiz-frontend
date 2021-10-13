import { motion } from "framer-motion";
import classNames from "../../../lib/classNames";
import { getRandomFloat, getRandomInt } from "../../../lib/getRandomNumber";
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
  float = false,
  onClick = undefined,
}) => {
  size =
    typeof size === "number"
      ? `${size}px`
      : /\D/.test(size)
      ? size
      : `${size}px`;

  const variants = {
    initial: {
      width: size,
      height: size,
      filter: "drop-shadow(0 3px 6px rgba(0, 0, 0, 0.2))",
      ...custom,
    },
    float: {
      filter: [
        null,
        `drop-shadow(0 ${getRandomInt(10, 20)}px 15px rgba(0, 0, 0, 0.1));`,
      ],
      y: [null, -getRandomInt(-8, 8)],
      x: [null, getRandomInt(-5, 5)],
    },
    bycss: {},
  };

  const transition = {
    repeat: Infinity,
    duration: getRandomInt(3, 8),
    delay: getRandomFloat(0, 3),
    repeatType: "reverse",
  };
  const notransition = {
    duration: 0,
  };

  return (
    <motion.div
      className={classNames(classes.wrapper, classes[status], className)}
      variants={variants}
      // transition={float ? transition : notransition}
      initial="initial"
      // animate={float ? "float" : "bycss"}
      onClick={status === "active" && !!onClick ? onClick : undefined}
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
