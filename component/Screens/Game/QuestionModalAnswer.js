import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./QuestionModalAnswer.module.scss";
import Button from "../../ui/Button/Button";
import { gameActions } from "../../../store/gameSlice";
import classNames from "../../../lib/classNames";

const QuestionModalAnswer = ({ answer, answerKey }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);

  const clickHandler = () => {
    setSelected((state) => !state);
  };
  const confirmHandler = () => {
    dispatch(gameActions.scorecurrentQuestionIndex(answer));
  };

  return (
    <li className={classes.wrapper} onClick={clickHandler}>
      <span className={classNames(selected && classes.active)}>
        {answerKey}
      </span>
      <span>{answer}</span>
      {selected && (
        <Button size="s" className={classes.btn} onClick={confirmHandler} />
      )}
    </li>
  );
};

export default QuestionModalAnswer;
