import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "../../../store/gameSlice";

import Bg from "../../ui/Background/Bg";
import GameQuestionMap from "./GameQuestionMap";
import GameConsole from "./GameConsole";
import ClientOnlyPortal from "../../ui/ClientOnlyPortal/ClientOnlyPortal";
import QuestionModal from "./QuestionModal";
import FeedbackModal from "./FeedbackModal";
import { getLevelMap } from "../../../lib/brandAssets";
import useSSRLayoutEffect from "../../../hooks/useSSRLayoutEffect";

gsap.registerPlugin(ScrollToPlugin);

const GameScreen = () => {
  const router = useRouter();

  const ui = useSelector((state) => state.ui);
  const { currentLevel } = useSelector((state) => state.player);
  const { answerList, currentQuestionIndex } = useSelector(
    (state) => state.game
  );
  const { isAnswered } = answerList;
  const dispatch = useDispatch();

  const [bgLoaded, setBgLoaded] = useState(false);

  // Styling and animation
  useEffect(() => {
    const bgEl = document.querySelector("[data-background-image]");
    document.querySelector("#__next").style.height = `${
      bgEl.getBoundingClientRect().height
    }px`;

    const tween = gsap.to(window, {
      duration: 1,
      scrollTo: document.documentElement.scrollHeight,
      ease: "power3.in",
    });

    setBgLoaded(true);

    return () => {
      document.querySelector("#__next").removeAttribute("style");
      tween?.kill();
    };
  }, []);

  // start or reset the timer for scoring
  useEffect(() => {
    if (ui.questionModal) {
      dispatch(gameActions.recordStartTime());
    } else {
      dispatch(gameActions.resetStartTime());
    }
  }, [dispatch, ui.questionModal]);

  // handler to go to the next question or not
  const goToNextQuestionHandler = () => {
    if (currentQuestionIndex < 10 && isAnswered[currentQuestionIndex]) {
      dispatch(gameActions.goToNextQuestion());
    }
  };

  // end the game when the player finishes 10 questions
  useEffect(() => {
    if (currentQuestionIndex === 10) {
      console.log("game finished!");
      // Redirect the player to check the result
      router.push("/result");
    }
  }, [currentQuestionIndex]);

  return (
    <>
      <Bg
        bgProps={getLevelMap(currentLevel)}
        stretch={false}
        // onLoadingComplete={() => {
        //   setBgLoaded(true);
        // }}
      />

      {bgLoaded && <GameQuestionMap />}

      <GameConsole />

      <ClientOnlyPortal selector="[data-fixed]">
        <AnimatePresence onExitComplete={goToNextQuestionHandler}>
          {ui.questionModal && <QuestionModal key="questionModal" />}
          {ui.feedbackModal && <FeedbackModal key="feedbackModal" />}
        </AnimatePresence>
      </ClientOnlyPortal>
    </>
  );
};

export default GameScreen;
