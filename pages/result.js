import { useRouter } from "next/router";
import { getPlaiceholder } from "plaiceholder";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedbackModalScore from "../component/Screens/Game/FeedbackModalScore";
import Bg from "../component/ui/Background/Bg";
import Button from "../component/ui/Button/Button";
import Nav from "../component/ui/Header/Nav";
import Img from "../component/ui/Image/Img";
import LoaderDrop from "../component/ui/Loader/LoaderDrop";
import { getBadge } from "../lib/brandAssets";
import classNames from "../lib/classNames";
import { gameActions, PASSING_LEVEL_SCORE } from "../store/gameSlice";
import { playerActions, syncPlayerData } from "../store/playerSlice";
import classes from "../styles/Result.module.scss";

const Result = ({ images }) => {
  // console.log(images);
  const [loaded, setLoaded] = useState(false);

  const router = useRouter();

  const game = useSelector((state) => state.game);
  const { currentLevel, scoreTotal } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  // player state in game: level and total game
  const isFinished = game.currentQuestionIndex === 10;
  const isPassed = game.currentLevelScore >= PASSING_LEVEL_SCORE;
  const isVerified = currentLevel === 3 && isFinished && isPassed;

  // state decides ui
  const [result, setResult] = useState({
    title: "",
    content: "",
    score: 0,
    hint: "",
    buttons: [],
    level: 0,
  });

  // Handlers
  const goToLevels = () => {
    setLoaded(false);
    dispatch(gameActions.resetGame());
    router.replace("/levels");
  };

  const goToMe = () => {
    setLoaded(false);
    dispatch(gameActions.resetGame());
    router.replace("/me");
  };

  // Syncing
  useEffect(() => {
    if (isFinished && isPassed) {
      const dataToBeUpdated = {};
      dataToBeUpdated[`score${currentLevel + 1}`] = game.currentLevelScore;
      dataToBeUpdated["currentLevel"] = currentLevel + 1;
      dataToBeUpdated["scoreTotal"] = scoreTotal + game.currentLevelScore;
      dataToBeUpdated["life"] = 3;

      dispatch(playerActions.replacePlayerInfo(dataToBeUpdated));

      try {
        (async () => {
          await dispatch(syncPlayerData(dataToBeUpdated));
        })();
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    if (!isFinished)
      setResult({
        title: "?????????",
        content: "???????????????????????????\r\n???????????????????????????",
        score: "???",
        hint: "??????????????????",
        buttons: [{ text: "????????????", handler: goToLevels }],
        level: currentLevel < 0 ? 0 : currentLevel,
      });
    else if (isFinished && !isPassed)
      setResult({
        title: "?????????",
        content: "???????????????\r\n?????????0???????????????",
        score: game.currentLevelScore,
        hint: "??????????????????",
        buttons: [{ text: "????????????", handler: goToLevels }],
        level: currentLevel < 0 ? 0 : currentLevel,
      });
    else if (isFinished && isPassed && !isVerified)
      setResult({
        title: "?????????",
        content: "????????????????????????\r\n?????????1???????????????",
        score: game.currentLevelScore,
        hint: "?????????????????????????????????????????????",
        buttons: [
          { text: "????????????", handler: goToLevels },
          { text: "????????????", handler: goToMe },
        ],
        level: currentLevel + 1,
      });
    else if (isVerified) {
      setResult({
        title: "?????????",
        content: "????????????????????????\r\n???????????????????????????",
        score: game.currentLevelScore + scoreTotal,
        hint: "",
        buttons: [{ text: "????????????", handler: goToMe }],
        level: currentLevel + 1,
      });
    }

    setLoaded(true);
  }, [isFinished, isPassed]);

  return (
    <>
      <Bg className={!isPassed && classes.bw} />
      {!loaded && <LoaderDrop />}

      {loaded && (
        <>
          <Nav
            containerClassName={classes.nav}
            title={result.title}
            className={classNames(
              classes.title,
              isPassed ? classes.green : classes.orange
            )}
            leftIcon="/icons/icon-x.svg"
            leftAlt="icon of leaving the page"
            leftClickHandler={goToLevels}
            rightClickHandler={goToMe}
          />

          <section className={classes.score__panel}>
            <div className={classes.content}>{result.content}</div>
            <div
              className={classNames(
                classes.info,
                isPassed ? classes.green : classes.orange
              )}
            >
              {isVerified ? "???????????????" : "?????????????????????"}
            </div>
            <FeedbackModalScore
              className={classes.score}
              result={isPassed}
              score={result.score}
              sign={false}
            />
            {isFinished && !isPassed && (
              <span className={classes.caption}>
                ?????????{PASSING_LEVEL_SCORE - result.score}??????????????????
              </span>
            )}
          </section>

          <section className={classes.puzzle}>
            <Img {...getBadge(result.level)} />
            <span className={classes.caption}>
              ??????????????????{result.level}?????????
            </span>
          </section>

          <section className={classes.action}>
            {result.hint && (
              <span className={classes.caption}>{result.hint}</span>
            )}
            <div className={classes.btns}>
              {result.buttons.map((e, index) => (
                <Button key={Math.random()} onClick={e.handler}>
                  {e.text}
                </Button>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Result;

export const getStaticProps = async () => {
  const imagePaths = [
    "https://res.cloudinary.com/npc2021/image/upload/v1635493284/badge_0_2x_e8518cc508.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635493284/badge_1_2x_377a44bfa8.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635493284/badge_2_2x_6f4ffa13f9.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635493284/badge_3_2x_dc1c7102f3.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635493284/badge_4_2x_ea45ba4583.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635493284/badge_5_2x_440a82ddb1.png",
  ];
  const images = await Promise.all(
    imagePaths.map(async (src, index) => {
      const { base64, img } = await getPlaiceholder(src, { size: 16 });
      return {
        ...img,
        blurDataURL: base64,
      };
    })
  ).then((values) => values);

  return {
    props: { images },
  };
};
