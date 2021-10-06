import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import Bg from "../../ui/Background/Bg";
import Button from "../../ui/Button/Button";
import Img from "../../ui/Image/Img";
import QuestionModalAnswer from "./QuestionModalAnswer";
import QuestionModalQuestion from "./QuestionModalQuestion";
import { uiActions } from "../../../store/uiSlice";

import classes from "./QuestionModal.module.scss";

const temp =
  "https://res.cloudinary.com/npc2021/image/upload/v1633447448/nutricia_research_center_building_f753839aae.jpg";

const QuestionModal = (props) => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { questionList, currentQuestionIndex } = game;
  const question = questionList.questions[currentQuestionIndex];

  const hideQuestionModalHandler = () => {
    dispatch(uiActions.hideQuestion());
  };

  const optionEls = Object.entries(question.answers)
    .filter(([key, _]) => key !== "id")
    .map(([key, value]) => (
      <QuestionModalAnswer answer={value} answerKey={key} key={key + value} />
    ));

  return (
    <motion.div className={classes.screen}>
      <Bg className={classes.bg} />
      <Img
        src={temp}
        className={classes.image}
        layout="fill"
        objectFit="cover"
      />
      <Button
        className={classes.backbtn}
        type="circle"
        size="m"
        color="blue"
        src="/icons/icon-angle-bracket.svg"
        ring
        onClick={hideQuestionModalHandler}
      />

      <div className={classes.console}>
        <QuestionModalQuestion question={question.question} />
        <ul className={classes.answers}>{optionEls}</ul>
      </div>
    </motion.div>
  );
};

export default QuestionModal;