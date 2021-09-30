import Button from "../../ui/Button/Button";
import LevelRing from "../../ui/LevelRing/LevelRing";

import classes from "./LandingScreen.module.scss";

const LandingScreen = (props) => {
  return (
    <>
      <div className={classes.levels}>
        <LevelRing
          size="42vw"
          active={true}
          position={{ top: "5%", left: "-4%" }}
          src="https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_1_0c0bad1164.png"
        />
        <LevelRing
          size="52vw"
          active={true}
          position={{ top: "8%", right: "-10%" }}
          src="https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_2_249f115968.png"
        />
        <LevelRing
          size="49vw"
          active={true}
          position={{ bottom: "15%", left: "-12%" }}
          src="https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_3_ff792ef78e.png"
        />
        <LevelRing
          size="57vw"
          active={true}
          position={{ bottom: "3%", right: "-15%" }}
          src="https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_4_4d0a70795c.png"
        />
      </div>

      <div className={classes.interaction}>
        <h1>游戏开始界面</h1>
        <div className={classes.buttons}>
          <Button size="m">开始游戏</Button>
          <Button size="m">游戏说明</Button>
        </div>
      </div>
    </>
  );
};

export default LandingScreen;
