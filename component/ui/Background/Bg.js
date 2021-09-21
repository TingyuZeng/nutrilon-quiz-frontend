import shuffle from "../../../lib/shuffle";
import Img from "../Image/Img";
import classes from "./Bg.module.scss";

const levelProfiles = [
  "https://res.cloudinary.com/npc2021/image/upload/v1630080772/level_profile_1_6edcdecaa4.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1630080784/level_profile_2_f96982efc1.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1630080794/level_profile_3_c867acb0ce.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1630080803/level_profile_4_6afe96a25c.png",
];

const defaultBg = {
  width: 750,
  height: 1624,
  blurDataURL:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAIAAAArjXluAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJUlEQVQImWPIqW4saulh+Pzz17f//xku3Hv28tM3hqDEJAZOKQDrGA9imORcewAAAABJRU5ErkJggg==",
  src: "https://res.cloudinary.com/npc2021/image/upload/v1631793369/bg_landing_90a0720ec7.png",
  type: "png",
};

const Bg = ({ bgProps = defaultBg }) => {
  delete bgProps.width;
  delete bgProps.height;

  const levelBubbles = shuffle(levelProfiles).map((src) => (
    <Img
      key={src}
      src={src}
      className={classes.bubble}
      width={500}
      height={500}
    />
  ));

  return (
    // <div className={classes.wrapper}>
    //   <div className={classes.levels}>{levelBubbles}</div>
    //   <Img
    //     src="https://res.cloudinary.com/npc2021/image/upload/v1631793369/bg_landing_90a0720ec7.png"
    //     className={classes.bg}
    //   />
    // </div>
    <div className={classes.wrapper}>
      <Img {...bgProps} className={classes.bg} objectFit="fill" />
    </div>
  );
};

export default Bg;
