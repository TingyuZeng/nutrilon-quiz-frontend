import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import useScreenSize from "../../hooks/useScreenSize";

import Bg from "../ui/Background/Bg";
import ButtonCircle from "../ui/Button/ButtonCircle";

import classes from "./AvatarScene.module.scss";

const BG_MOM = {
  src: "https://res.cloudinary.com/npc2021/image/upload/v1632222979/bg_mom_2x_65bedb6ae0.png",
  width: 750,
  height: 1624,
  type: "png",
  //   blurDataURL:
  //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAIAAAArjXluAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVQImQEcAOP/AJmttnaKmADa4+iYq7gA////3tbSABsvNgAHDeb8Dkznr48eAAAAAElFTkSuQmCC",
};

const BG_DAD = {
  src: "https://res.cloudinary.com/npc2021/image/upload/v1632222979/bg_dad_2x_e77a59ee5e.png",
  width: 750,
  height: 1624,
  type: "png",
  //   blurDataURL:
  //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAIAAAArjXluAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVQImQEcAOP/AM7W3/3//wDDytXW3ugAvcvVx8LHABoyNgAHCxBwD74Te3NvAAAAAElFTkSuQmCC",
};

const BG_BABY = {
  src: "https://res.cloudinary.com/npc2021/image/upload/v1632222979/bg_baby_2x_1232d80d5d.png",
  width: 750,
  height: 1624,
  type: "png",
  //   blurDataURL:
  //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAIAAAArjXluAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJUlEQVQImWM4e+vFj///Ge68+HTo0kMGs7AcfY9wBl1XXwYufgD3dQ1PrmoKYwAAAABJRU5ErkJggg==",
};

const BGS = [BG_MOM, BG_DAD, BG_BABY];

const SWIPE_THRESHOLD = 60000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const AvatarScene = (props) => {
  //record current page and paginate direction
  const [[page, direction], setPage] = useState([0, 0]);
  const changePage = (newDirection) => {
    return () =>
      setPage(([prevPage, prevDirection]) => [
        prevPage + newDirection,
        newDirection,
      ]);
  };

  // translate the page to avatar index
  const avatarNums = BGS.length;
  const avatarIndex = ((page % avatarNums) + avatarNums) % avatarNums;

  // animation configs for swiping

  // motion.div variants (depending on the screen width)
  const { width: screenWidth } = useScreenSize();
  const variants = useMemo(
    () => ({
      initial: (direction) => ({
        x: direction > 0 ? screenWidth : -screenWidth,
        scale: 0.4,
        opacity: 0,
      }),
      animate: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
      exit: (direction) => ({
        zIndex: 0,
        x: direction > 0 ? -screenWidth : screenWidth,
        scale: 0.4,
        opacity: 0,
      }),
    }),
    [screenWidth]
  );

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className={classes.background}
          key={page}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          drag="x"
          whileDrag={{ scale: 0.8 }}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            // console.log(`offset: ${offset.x}`);
            // console.log(`velocity: ${velocity.x}`);
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe > SWIPE_THRESHOLD) {
              changePage(-1)();
            } else if (swipe < -SWIPE_THRESHOLD) {
              changePage(1)();
            }
          }}
        >
          <Bg bgProps={BGS[avatarIndex]} />
        </motion.div>
      </AnimatePresence>

      <div className={classes.console}>
        <ButtonCircle onClick={changePage(-1)}>
          <img src="/icons/icon-angle-bracket.svg" alt="icon of previous" />
        </ButtonCircle>
        <ButtonCircle onClick={changePage(1)}>
          <img
            className={classes.mirror}
            src="/icons/icon-angle-bracket.svg"
            alt="icon of next"
          />
        </ButtonCircle>
      </div>
    </>
  );
};

export default AvatarScene;
