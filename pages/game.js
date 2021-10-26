import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";
import { getCurrentLevelQuestions } from "../store/gameSlice";

import Bg from "../component/ui/Background/Bg";
import LoaderDrop from "../component/ui/Loader/LoaderDrop";
import GameScreen from "../component/Screens/Game/GameScreen";
import LevelRing from "../component/ui/LevelRing/LevelRing";
import Button from "../component/ui/Button/Button";
import classes from "../styles/Game.module.scss";

const Game = () => {
  const [dataReceived, setDataReceived] = useState(false);
  const [introRead, setIntroRead] = useState(false);

  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const clickHandler = () => {
    setIntroRead(true);
  };

  useEffect(() => {
    dispatch(getCurrentLevelQuestions());
  }, []);

  useEffect(() => {
    if (dataReceived) return;
    setDataReceived(true);
  }, [game.questionList.levelInfo]);

  return (
    <>
      {!dataReceived && (
        <>
          <LoaderDrop />
          <Bg />
        </>
      )}

      {dataReceived && !introRead && (
        <>
          <motion.div
            className={classes.intro}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <LevelRing
              className={classes.levelring}
              leve={game.questionList.level}
              text={game.questionList.name}
              onClick={clickHandler}
            />
            <p className={classes.text}>{game.questionList.levelInfo}</p>
            <p className={classes.disclaimer}>重要提示：母乳是宝宝最好的食物</p>
            <Button onClick={clickHandler}>开始挑战</Button>
          </motion.div>
          <Bg />
        </>
      )}

      {dataReceived && introRead && <GameScreen />}
    </>
  );
};

export default Game;
