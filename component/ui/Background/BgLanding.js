import Img from "../Image/Img";
import classes from "./BgLanding.module.scss";

const levelProfiles = [
  "https://res.cloudinary.com/npc2021/image/upload/v1629982622/level_profile_1_6edcdecaa4.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1629982622/level_profile_2_f96982efc1.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1629982622/level_profile_3_c867acb0ce.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1629982622/level_profile_4_6afe96a25c.png",
];

const BgLanding = () => {
  const levelBubbles = levelProfiles.map((src) => (
    <Img
      key={src}
      src={src}
      className={classes.bubble}
      width={500}
      height={500}
    />
  ));

  return (
    <div className={classes.wrapper}>
      <div className={classes.levels}>{levelBubbles}</div>
      <Img
        src="https://res.cloudinary.com/npc2021/image/upload/v1629982623/bg_landing_90a0720ec7.png"
        className={classes.bg}
      />
    </div>
  );
};

export default BgLanding;
