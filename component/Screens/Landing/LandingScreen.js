import Link from "next/link";
import Button from "../../ui/Button/Button";
import Img from "../../ui/Image/Img";
import LevelRing from "../../ui/LevelRing/LevelRing";

import classes from "./LandingScreen.module.scss";

const LandingScreen = (props) => {
  return (
    <>
      <div className={classes.interaction}>
        <Img
          src="https://res.cloudinary.com/npc2021/image/upload/v1634138351/title_2x_9f3274c7c1.png"
          width={688}
          height={368}
        />
        <div className={classes.buttons}>
          <Button size="m">
            <Link href="/levels">开始游戏</Link>
          </Button>
          <Button size="m">
            <Link href="/manual">游戏说明</Link>
          </Button>
        </div>
      </div>

      <div className={classes.levels}>
        <LevelRing
          float
          size="42vw"
          active={true}
          custom={{
            top: "5%",
            left: "-4%",
            maxWidth: "210px",
            maxHeight: "210px",
          }}
          src="https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_1_0c0bad1164.png"
        />
        <LevelRing
          float
          size="52vw"
          active={true}
          custom={{
            top: "8%",
            right: "-10%",
            maxWidth: "260px",
            maxHeight: "260px",
          }}
          src="https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_2_249f115968.png"
        />
        <LevelRing
          float
          size="49vw"
          active={true}
          custom={{
            bottom: "15%",
            left: "-12%",
            maxWidth: "245px",
            maxHeight: "245px",
          }}
          src="https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_3_ff792ef78e.png"
        />
        <LevelRing
          float
          size="57vw"
          active={true}
          custom={{
            bottom: "3%",
            right: "-15%",
            maxWidth: "285px",
            maxHeight: "285px",
          }}
          src="https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_4_4d0a70795c.png"
        />
      </div>
    </>
  );
};

export default LandingScreen;
