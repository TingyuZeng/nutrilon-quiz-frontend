import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import classNames from "../../../lib/classNames";
import Button from "../../ui/Button/Button";
import ClientOnlyPortal from "../../ui/ClientOnlyPortal/ClientOnlyPortal";
import classes from "./GameConsole.module.scss";
import GameConsoleLifeCounter from "./GameConsoleLifeCounter";

const GameConsole = (props) => {
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const game = useSelector((state) => state.game);
  const { life } = player;
  const { currentLevelScore } = game;

  return (
    <ClientOnlyPortal selector="[data-fixed]">
      <div className={classes.screen}>
        <div className={classes.bg}>
          <Button
            className={classes.profile}
            src={
              player.headimgurl ||
              "https://res.cloudinary.com/npc2021/image/upload/v1633443295/default_profile_image_3109ee6c17.jpg"
            }
            color="white"
            type="circle"
            ring={false}
          />

          <div className={classes.controls}>
            <div className={classes.control}>
              <Button color="white" type="circle" ring={false}>
                <GameConsoleLifeCounter life={life} />
              </Button>
              <span className={classes.label}>动力值</span>
            </div>

            <div className={classes.control}>
              <Button color="white" type="circle" ring={false}>
                {currentLevelScore}
              </Button>
              <span className={classes.label}>能量值</span>
            </div>

            <div className={classNames(classes.control, classes.back)}>
              <Button
                src="/icons/icon-angle-bracket-blue.svg"
                color="white"
                type="circle"
                ring={false}
                onClick={() => router.back()}
              />
            </div>
          </div>
        </div>
      </div>
    </ClientOnlyPortal>
  );
};

export default GameConsole;
