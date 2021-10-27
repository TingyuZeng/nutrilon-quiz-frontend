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
import { gameActions } from "../store/gameSlice";
import { playerActions, syncPlayerData } from "../store/playerSlice";
import classes from "../styles/Result.module.scss";

const Result = ({ images }) => {
  console.log(images);
  const [loaded, setLoaded] = useState(false);

  const router = useRouter();

  const game = useSelector((state) => state.game);
  const { currentLevel, scoreTotal } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  // player state in game: level and total game
  const isFinished = game.currentQuestionIndex === 10;
  const isPassed = game.currentLevelScore >= 80;
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
  const goToLanding = () => {
    setLoaded(false);
    dispatch(gameActions.resetGame());
    router.replace("/landing");
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
      dispatch(syncPlayerData(dataToBeUpdated));
    }
  }, []);

  useEffect(() => {
    if (!isFinished)
      setResult({
        title: "很抱歉",
        content: "您尚未完成本次挑战\r\n不能查看当前能量值",
        score: "???",
        hint: "准备好了吗？",
        buttons: [{ text: "开始挑战", handler: goToLanding }],
        level: currentLevel < 0 ? 0 : currentLevel,
      });
    else if (isFinished && !isPassed)
      setResult({
        title: "很抱歉",
        content: "能量值不足\r\n收集到0枚智慧拼图",
        score: game.currentLevelScore,
        hint: "准备好了吗？",
        buttons: [{ text: "重新挑战", handler: goToLanding }],
        level: currentLevel < 0 ? 0 : currentLevel,
      });
    else if (isFinished && isPassed && !isVerified)
      setResult({
        title: "恭喜你",
        content: "成功完成本次挑战\r\n收集到1枚智慧拼图",
        score: game.currentLevelScore,
        hint: "继续探索之旅，收集所有智慧拼图",
        buttons: [
          { text: "继续旅程", handler: goToLanding },
          { text: "下载素材", handler: goToMe },
        ],
        level: currentLevel + 1,
      });
    else if (isVerified) {
      setResult({
        title: "恭喜你",
        content: "您已集齐所有拼图\r\n请前往收集您的证书",
        score: game.currentLevelScore + scoreTotal,
        hint: "",
        buttons: [{ text: "领取证书", handler: goToMe }],
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
            leftClickHandler={goToLanding}
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
              {isVerified ? "最终能量值" : "本关最终能量值"}
            </div>
            <FeedbackModalScore
              className={classes.score}
              result={isPassed}
              score={result.score}
              sign={false}
            />
            {isFinished && !isPassed && (
              <span className={classes.caption}>
                您只差{60 - result.score}分便挑战成功
              </span>
            )}
          </section>

          <section className={classes.puzzle}>
            <Img {...getBadge(result.level)} />
            <span className={classes.caption}>
              您当前收集到{result.level}枚拼图
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
    "https://res.cloudinary.com/npc2021/image/upload/v1635327967/manual_1_2x_1b5211eed8.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635327967/manual_2_2x_345e679060.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635327966/manual_3_2x_45333f5f44.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635327967/manual_4_2x_a39155ff8c.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635327967/manual_5_2x_b42bd2daee.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635327967/manual_6_2x_b6969077af.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635327967/manual_7_2x_5e655f66a6.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635327967/manual_8_2x_dfa8c60234.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635327967/manual_9_2x_74eb7d8078.png",
    "https://res.cloudinary.com/npc2021/image/upload/v1635327966/manual_10_2x_7e0523b65a.png",
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
