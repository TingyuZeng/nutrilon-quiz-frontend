import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Button from "../../ui/Button/Button";
import Header from "../../ui/Header/Header";
import LevelRing from "../../ui/LevelRing/LevelRing";

import classes from "./LevelsScreen.module.scss";

const LevelsScreen = () => {
  const player = useSelector((state) => state.player);

  const currentLevelIndex = player.currentLevel;
  const levels = [0, 1, 2, 3].map((index) =>
    index < currentLevelIndex
      ? "passed"
      : index === currentLevelIndex
      ? "active"
      : "inactive"
  );

  const router = useRouter();

  return (
    <>
      <div className={classes.nav}>
        <section className={classes.header}>
          <Button
            size="m"
            color="blue"
            type="circle"
            src="/icons/icon-angle-bracket.svg"
            alt="icon of previous"
            onClick={() => router.back()}
          />
          <Header className={classes.title}>选择参观景点</Header>
          <Button
            size="m"
            color="blue"
            type="circle"
            src="/icons/icon-me.svg"
            alt="icon of me"
          />
        </section>

        <section className={classes.side}>
          <Button size="s" color="blue" className={classes.btn}>
            游戏说明
          </Button>
        </section>
      </div>

      <div className={classes.content}>
        <section className={classes.map}>
          <LevelRing
            level={0}
            status={levels[0]}
            custom={{ bottom: "0", left: "8%", transform: "translateY(40%)" }}
            text="Zoetermeer"
          />
          <LevelRing
            level={1}
            status={levels[1]}
            custom={{
              right: "10%",
              bottom: "175px",
              transform: "translateY(50%)",
            }}
            text="Utrecht"
          />
          <LevelRing
            level={2}
            status={levels[2]}
            custom={{ left: "3%", top: "80px" }}
            text="Cuijk"
          />
          <LevelRing
            level={3}
            status={levels[3]}
            custom={{ top: "-1%", right: "6%" }}
            text="Amsterdam"
          />
        </section>

        <section className={classes.action}>
          <Button onClick={() => router.push("/game")}>即刻启程</Button>
        </section>
      </div>
    </>
  );
};

export default LevelsScreen;
