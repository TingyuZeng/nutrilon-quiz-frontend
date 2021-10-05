import { useSelector, useDispatch } from "react-redux";

import Button from "../../ui/Button/Button";
import ClientOnlyPortal from "../../ui/ClientOnlyPortal/ClientOnlyPortal";
import QuestionPanel from "./QuestionPanel";
import classes from "./Questions.module.scss";

const Questions = (props) => {
  const game = useSelector((state) => state.game);
  const { answerList, currentQuestionIndex } = game;
  const { isCorrect } = answerList;

  const questionBtns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse().map((e) => {
    const index = e - 1;
    let color = "gray",
      active = true;
    if (index === currentQuestionIndex) {
      color = "gold";
    } else if (index < currentQuestionIndex) {
      active = false;
      color = isCorrect[index] ? "blue" : "red";
    }
    return (
      <Button
        float
        type="circle"
        color={color}
        active={active}
        key={e}
        className={classes[`btn-${e}`]}
      >
        {e}
      </Button>
    );
  });
  return (
    <>
      <div className={classes.btns}>{questionBtns}</div>

      <ClientOnlyPortal selector="[data-fixed]">
        <QuestionPanel />
      </ClientOnlyPortal>
    </>
  );
};

export default Questions;
