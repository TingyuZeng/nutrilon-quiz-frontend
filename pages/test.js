import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { playerActions } from "../store/playerSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getPlaiceholder } from "plaiceholder";
import AvatarScreen from "../component/Screens/Avatar/AvatarScreen";
import Bg from "../component/ui/Background/Bg";
import Button from "../component/ui/Button/Button";
import { syncPlayerData } from "../store/playerSlice";

const Test = (props) => {
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();
  console.log(player);
  useEffect(() => {
    axios
      .get("./api/getPlayer", {
        params: {
          hashid: localStorage.getItem("NUTRILON_PLAYER"),
        },
      })
      .then((res) => {
        dispatch(playerActions.replacePlayerInfo(res.data));
      });
  }, []);

  const clickHandler = () => {
    // router.push("/levels");
    dispatch(syncPlayerData({ nickname: "Tingyu" }));
  };

  return (
    <>
      <Bg />
      {/* <AvatarScreen /> */}
      <Button onClick={clickHandler} />
      <Button
        onClick={() => {
          router.push("/game");
        }}
      >
        to Game
      </Button>
    </>
  );
};

export default Test;

export const getStaticProps = async () => {
  const imagePaths = {
    droplet:
      "https://res.cloudinary.com/npc2021/image/upload/v1631799581/asset_droplet_97fae8690e.png",
    bgLanding:
      "https://res.cloudinary.com/npc2021/image/upload/v1631793369/bg_landing_90a0720ec7.png",
    bgMom:
      "https://res.cloudinary.com/npc2021/image/upload/v1632321460/bg_mom_2x_65bedb6ae0.png",
    bgDad:
      "https://res.cloudinary.com/npc2021/image/upload/v1632321526/bg_dad_2x_e77a59ee5e.png",
    bgbaby:
      "https://res.cloudinary.com/npc2021/image/upload/v1632321500/bg_baby_2x_1232d80d5d.png",
  };

  const images = await Promise.all(
    Object.entries(imagePaths).map(async ([title, src]) => {
      const { base64, img } = await getPlaiceholder(src);
      return {
        ...img,
        title,
        blurDataURL: base64,
      };
    })
  ).then((values) => values);

  return {
    props: {
      images,
    },
  };
};
