import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "../../../store/gameSlice";
import Bg from "../../ui/Background/Bg";
import Button from "../../ui/Button/Button";
import Img from "../../ui/Image/Img";
import classes from "./QuestionPanel.module.scss";
import QuestionPanelAnswer from "./QuestionPanelAnswer";
import QuestionPanelQuestion from "./QuestionPanelQuestion";
const temp =
  "https://res.cloudinary.com/npc2021/image/upload/v1633447448/nutricia_research_center_building_f753839aae.jpg";

const QuestionPanel = (props) => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { questionList, currentQuestionIndex } = game;
  const question = questionList.questions[currentQuestionIndex];

  const optionEls = Object.entries(question.answers)
    .filter(([key, _]) => key !== "id")
    .map(([key, value]) => (
      <QuestionPanelAnswer answer={value} answerKey={key} key={key + value} />
    ));

  useEffect(() => {
    dispatch(gameActions.recordStartTime());
  }, [dispatch, currentQuestionIndex]);

  return (
    <div className={classes.screen}>
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
        onclick={null}
      />

      <div className={classes.console}>
        <QuestionPanelQuestion question={question.question} />
        <ul className={classes.answers}>{optionEls}</ul>
      </div>
    </div>
  );
};

export default QuestionPanel;
