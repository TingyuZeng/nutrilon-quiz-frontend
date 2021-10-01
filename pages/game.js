import { getPlaiceholder } from "plaiceholder";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/store";
import logError from "../lib/logError";

import Bg from "../component/ui/Background/Bg";
import Button from "../component/ui/Button/Button";
import LevelsScreen from "../component/Screens/Levels/LevelsScreen";
import useScreenSize from "../hooks/useScreenSize";
import LoaderDrop from "../component/ui/Loader/LoaderDrop";
import ButtonCircle from "../component/ui/Button/ButtonCircle";

const Game = (props) => {
  const { loaderProps, bgProps } = props;
  const [loaded, setLoaded] = useState(false);
  const [synced, setSynced] = useState(false);
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  // console.log(player);
  // console.log(player);
  // useEffect(() => {}, []);

  const [height, setHeight] = useState(600);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  useEffect(() => {
    const bgEl = document.querySelector("[data-background-image]");
    console.log(bgEl.getBoundingClientRect().height);
    setHeight(bgEl.getBoundingClientRect().height);
  }, [loaded]);

  return (
    <>
      {!loaded && (
        <>
          <LoaderDrop loaderProps={loaderProps} />
          <Bg />
        </>
      )}

      {loaded && (
        <>
          <Bg bgProps={bgProps} stretch={false} />
          <div style={{ height }}>
            <div style={{ margin: "50px" }}>
              <Button type="circle" onClick={() => console.log("Hello World")}>
                1
              </Button>
            </div>
          </div>
        </>
      )}
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
