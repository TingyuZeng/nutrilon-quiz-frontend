import { getPlaiceholder } from "plaiceholder";
import BgLanding from "../component/ui/Background/BgLanding";
import Button from "../component/ui/Button/Button";
import LoaderDrop from "../component/ui/Loader/LoaderDrop";

const Test = ({ loaderProps, bgProps }) => {
  return (
    <>
      <LoaderDrop loaderProps={loaderProps} />
      <BgLanding bgProps={bgProps} />
      <Button></Button>
    </>
  );
};

export default Test;

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
