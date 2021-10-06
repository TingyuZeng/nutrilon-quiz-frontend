import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "../../../store/gameSlice";

import Bg from "../../ui/Background/Bg";
import GameQuestionMap from "./GameQuestionMap";
import GameConsole from "./GameConsole";
import ClientOnlyPortal from "../../ui/ClientOnlyPortal/ClientOnlyPortal";
import QuestionModal from "./QuestionModal";

gsap.registerPlugin(ScrollToPlugin);

const GameScreen = ({ bgProps }) => {
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  // Styling and animation
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

  // show or hide the modal
  useEffect(() => {
    if (ui.questionModal) {
      dispatch(gameActions.recordStartTime());
    } else {
      dispatch(gameActions.resetStartTime());
    }
  }, [dispatch, ui.questionModal]);

  return (
    <>
      <Bg bgProps={bgProps} stretch={false} />

      <GameQuestionMap />

      <GameConsole />

      <ClientOnlyPortal selector="[data-fixed]">
        {ui.questionModal && <QuestionModal />}
        {ui.feedbackModal && ""}
      </ClientOnlyPortal>
    </>
  );
};

export default GameScreen;
