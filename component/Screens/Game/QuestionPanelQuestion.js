import classes from "./QuestionPanelQuestion.module.scss";

const QuestionPanelQuestion = ({ question }) => {
  return (
    <div className={classes.wrapper}>
      <h2>{question}</h2>
    </div>
  );
};

export default QuestionPanelQuestion;
