import { getPlaiceholder } from "plaiceholder";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/playerSlice";
import logError from "../lib/logError";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import Bg from "../component/ui/Background/Bg";
import Button from "../component/ui/Button/Button";
import LevelsScreen from "../component/Screens/Levels/LevelsScreen";
import useScreenSize from "../hooks/useScreenSize";
import LoaderDrop from "../component/ui/Loader/LoaderDrop";
import GameScreen from "../component/Screens/Game/GameScreen";
import { getCurrentLevelQuestions } from "../store/gameSlice";
import hashCode from "../lib/hashCode";

gsap.registerPlugin(ScrollToPlugin);

const Game = (props) => {
  const { loaderProps, bgProps } = props;
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentLevelQuestions());
  }, []);

  useEffect(() => {
    if (loaded) return;
    setLoaded(true);
  }, [game.questionList.level]);

  return (
    <>
      {!loaded && (
        <>
          <LoaderDrop loaderProps={loaderProps} />
          <Bg />
        </>
      )}

      {loaded && <GameScreen bgProps={bgProps} />}
    </>
  );
};

export default Game;

export const getStaticProps = async () => {
  const { base64: dropletBase64, img: dropletImg } = await getPlaiceholder(
    "https://res.cloudinary.com/npc2021/image/upload/v1631799581/asset_droplet_97fae8690e.png"
  );

  const { base64: bgBase64, img: bgImg } = await getPlaiceholder(
    "https://res.cloudinary.com/npc2021/image/upload/v1633101534/test_background_2x_e3d0411eca.png"
  );

  return {
    props: {
      loaderProps: {
        ...dropletImg,
        blurDataURL: dropletBase64,
      },
      bgProps: {
        ...bgImg,
        blurDataURL: bgBase64,
      },
    },
  };
};
