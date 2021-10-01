import { getPlaiceholder } from "plaiceholder";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/store";
import logError from "../lib/logError";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import Bg from "../component/ui/Background/Bg";
import Button from "../component/ui/Button/Button";
import LevelsScreen from "../component/Screens/Levels/LevelsScreen";
import useScreenSize from "../hooks/useScreenSize";
import LoaderDrop from "../component/ui/Loader/LoaderDrop";

gsap.registerPlugin(ScrollToPlugin);

const Game = (props) => {
  const { loaderProps, bgProps } = props;
  const [loaded, setLoaded] = useState(false);
  const [synced, setSynced] = useState(false);
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO API get questions or send user back
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const bgEl = document.querySelector("[data-background-image]");
    document.querySelector("#__next").style.height = `${
      bgEl.getBoundingClientRect().height
    }px`;

    const tween = gsap.to(window, {
      duration: 2,
      scrollTo: document.documentElement.scrollHeight,
      ease: "power3.in",
      delay: 0.35,
    });

    return () => {
      document.querySelector("#__next").removeAttribute("style");
      tween?.kill();
    };
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

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Button float type="circle" onClick={() => router.push("/levels")}>
              10
            </Button>
            <Button
              float
              color="gray"
              type="circle"
              onClick={() => console.log("Hello World")}
            >
              1
            </Button>
            <Button
              float
              color="blue"
              type="circle"
              onClick={() => console.log("Hello World")}
            >
              1
            </Button>
            <Button color="blue" type="circle" src=" " />
            <Button color="gold" type="circle" src=" " />
            <Button color="gray" type="circle" src=" " />
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
