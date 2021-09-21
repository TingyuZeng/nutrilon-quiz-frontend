import { getPlaiceholder } from "plaiceholder";
import AvatarScene from "../component/Avatar/AvatarScene";
import Bg from "../component/ui/Background/Bg";
import Button from "../component/ui/Button/Button";
import LoaderDrop from "../component/ui/Loader/LoaderDrop";

const Test = (props) => {
  return (
    <>
      <AvatarScene />
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
      "https://res.cloudinary.com/npc2021/image/upload/v1632222979/bg_mom_2x_65bedb6ae0.png",
    bgDad:
      "https://res.cloudinary.com/npc2021/image/upload/v1632222979/bg_dad_2x_e77a59ee5e.png",
    bgbaby:
      "https://res.cloudinary.com/npc2021/image/upload/v1632222979/bg_baby_2x_1232d80d5d.png",
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
