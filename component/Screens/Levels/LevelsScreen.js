import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Button from "../../ui/Button/Button";
import ButtonCircle from "../../ui/Button/ButtonCircle";
import Header from "../../ui/Header/Header";
import Img from "../../ui/Image/Img";

import path from "../../../public/bg-map-path.svg";
import classes from "./LevelsScreen.module.scss";
import LevelRing from "../../ui/LevelRing/LevelRing";
import { useSelector } from "react-redux";

const LevelsScreen = (props) => {
  const player = useSelector((state) => state.player);
  const currentLevelIndex = player.currentLevel - 1;
  const levels = [0, 1, 2, 3].map((index) =>
    index < currentLevelIndex
      ? "passed"
      : index === currentLevelIndex
      ? "active"
      : "inactive"
  );
  // const levels = ["active", "inactive", "inactive", "inactive"];
  // const levels = ["passed", "active", "inactive", "inactive"];
  // const levels = ["passed", "passed", "active", "inactive"];
  // const levels = ["passed", "passed", "passed", "active"];

  const router = useRouter();

  return (
    <>
      <div className={classes.nav}>
        <section className={classes.header}>
          <ButtonCircle
            src="/icons/icon-angle-bracket.svg"
            alt="icon of previous"
            onClick={() => router.back()}
          />
          <Header className={classes.title}>选择参观景点</Header>
          <ButtonCircle src="/icons/icon-me.svg" alt="icon of me" />
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
            position={{ bottom: "0", left: "8%", transform: "translateY(40%)" }}
          />
          <LevelRing
            level={1}
            status={levels[1]}
            position={{
              right: "10%",
              bottom: "175px",
              transform: "translateY(50%)",
            }}
          />
          <LevelRing
            level={2}
            status={levels[2]}
            position={{ left: "3%", top: "80px" }}
          />
          <LevelRing
            level={3}
            status={levels[3]}
            position={{ top: "-1%", right: "6%" }}
          />
        </section>

        <section className={classes.action}>
          <Button />
        </section>
      </div>
    </>
  );
};

export default LevelsScreen;
