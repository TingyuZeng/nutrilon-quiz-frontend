import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Bg from "../component/ui/Background/Bg";
import Nav from "../component/ui/Header/Nav";
import classNames from "../lib/classNames";
import classes from "../styles/Result.module.scss";

const Result = () => {
  const router = useRouter();
  const game = useSelector((state) => state.game);
  const isFinished = game.currentQuestionIndex === 10;

  return (
    <>
      <Bg />
      <Nav
        title="恭喜你"
        className={classNames(classes.title)}
        leftIcon="/icons/icon-x.svg"
        leftAlt="icon of leaving the page"
        leftClickHandler={() => router.push("/landing")}
      />
    </>
  );
};

export default Result;
