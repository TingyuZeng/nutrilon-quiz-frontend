import { getPlaiceholder } from "plaiceholder";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/playerSlice";
import logError from "../lib/logError";

import Bg from "../component/ui/Background/Bg";
import Button from "../component/ui/Button/Button";
import LevelsScreen from "../component/Screens/Levels/LevelsScreen";

const Levels = (props) => {
  const { loaderProps, bgProps } = props;
  const [loaded, setLoaded] = useState(false);
  const [synced, setSynced] = useState(false);
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  console.log(player);
  // useEffect(() => {}, []);

  return (
    <>
      <Bg bgProps={bgProps} />
      <LevelsScreen />
    </>
  );
};

export default Levels;

export const getStaticProps = async () => {
  const { base64: dropletBase64, img: dropletImg } = await getPlaiceholder(
    "https://res.cloudinary.com/npc2021/image/upload/v1631799581/asset_droplet_97fae8690e.png"
  );

  const { base64: bgBase64, img: bgImg } = await getPlaiceholder(
    "https://res.cloudinary.com/npc2021/image/upload/v1631793369/bg_landing_90a0720ec7.png"
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
