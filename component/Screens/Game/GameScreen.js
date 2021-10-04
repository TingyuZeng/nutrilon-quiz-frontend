import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import Bg from "../../ui/Background/Bg";
import Button from "../../ui/Button/Button";

import classes from "./GameScreen.module.scss";
import Questions from "./Questions";
import GameConsole from "./GameConsole";

gsap.registerPlugin(ScrollToPlugin);

const GameScreen = ({ bgProps }) => {
  useEffect(() => {
    const bgEl = document.querySelector("[data-background-image]");
    document.querySelector("#__next").style.height = `${
      bgEl.getBoundingClientRect().height
    }px`;

    const tween = gsap.to(window, {
      duration: 2,
      scrollTo: document.documentElement.scrollHeight,
      ease: "power3.in",
      delay: 0.35,
    });

    return () => {
      document.querySelector("#__next").removeAttribute("style");
      tween?.kill();
    };
  }, []);

  return (
    <>
      <Bg bgProps={bgProps} stretch={false} />

      <Questions />

      <GameConsole />
    </>
  );
};

export default GameScreen;
