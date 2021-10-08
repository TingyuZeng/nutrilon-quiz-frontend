import { getPlaiceholder } from "plaiceholder";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import Bg from "../component/ui/Background/Bg";

import LoaderDrop from "../component/ui/Loader/LoaderDrop";
import GameScreen from "../component/Screens/Game/GameScreen";
import { getCurrentLevelQuestions } from "../store/gameSlice";

gsap.registerPlugin(ScrollToPlugin);

const Game = (props) => {
  console.log(props);
  const [loaded, setLoaded] = useState(false);

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
          <LoaderDrop />
          <Bg />
        </>
      )}

      {loaded && <GameScreen />}
    </>
  );
};

export default Game;

export const getStaticProps = async () => {
  const { base64: dropletBase64, img: dropletImg } = await getPlaiceholder(
    "https://res.cloudinary.com/npc2021/image/upload/v1633694487/ice_bear_6_2x_d602a7eb32.png",
    { size: 10 }
  );

  return {
    props: {
      loaderProps: {
        ...dropletImg,
        blurDataURL: dropletBase64,
      },
    },
  };
};
