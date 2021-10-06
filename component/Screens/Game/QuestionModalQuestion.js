import classes from "./QuestionModalQuestion.module.scss";

const QuestionModalQuestion = ({ question }) => {
  return (
    <div className={classes.wrapper}>
      <h2>{question}</h2>
    </div>
  );
};

export default QuestionModalQuestion;
