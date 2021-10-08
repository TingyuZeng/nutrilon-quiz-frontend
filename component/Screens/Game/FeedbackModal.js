import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import { uiActions } from "../../../store/uiSlice";
import Bg from "../../ui/Background/Bg";
import classes from "./FeedbackModal.module.scss";
import { getBrandImage } from "../../../lib/brandAssets";
import Img from "../../ui/Image/Img";
import Header from "../../ui/Header/Header";
import Button from "../../ui/Button/Button";

import classNames from "../../../lib/classNames";
import FeedbackModalScore from "./FeedbackModalScore";

const FeedbackModal = () => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const {
    currentQuestionIndex,
    answerList: { isCorrect, scores },
    questionList: { questions },
  } = game;

  const result = isCorrect[currentQuestionIndex];
  const { feedback } = questions[currentQuestionIndex];
  const score = scores[currentQuestionIndex];

  const hideModalsHandler = () => {
    dispatch(uiActions.hideQuestion());
    dispatch(uiActions.hideFeedback());
  };

  return (
    <>
      <div className={classes.backdrop} onClick={hideModalsHandler} />
      <div className={classes.modal}>
        <motion.div
          className={classNames(classes.content, !result && classes.negative)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "anticipate" }}
        >
          <Bg className={classes.bg} />

          <div className={classes.scores}>
            <Img
              {...getBrandImage(result ? "correctModal" : "incorrectModal")}
              className={classes.bgSky}
            />
            <Img
              {...getBrandImage(result ? "bear6" : "bear2")}
              className={classNames(classes.bear, !result && classes.left)}
            />

            <div className={classes.info}>
              <Header className={classes.header}>能量值</Header>
              <FeedbackModalScore result={result} score={score} />
              <Button
                className={classes.exit}
                type="circle"
                color="blue"
                size="m"
                src="/icons/icon-x.svg"
                onClick={hideModalsHandler}
              />
            </div>
          </div>

          <div className={classes.explaination}>
            <h2>{result ? "回答正确" : "回答错误"}</h2>
            <p>{feedback}</p>
            <Button onClick={hideModalsHandler}>继续旅程</Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default FeedbackModal;
