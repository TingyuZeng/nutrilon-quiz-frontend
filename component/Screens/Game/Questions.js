import Button from "../../ui/Button/Button";
import classes from "./Questions.module.scss";

const Questions = (props) => {
  const questionBtns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .reverse()
    .map((e, index) => (
      <Button
        float
        type="circle"
        color="blue"
        key={e}
        className={classes[`btn-${e}`]}
      >
        {e}
      </Button>
    ));
  return <div className={classes.btns}>{questionBtns}</div>;
};

export default Questions;
