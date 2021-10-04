import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import classNames from "../../../lib/classNames";
import Button from "../../ui/Button/Button";
import ClientOnlyPortal from "../../ui/ClientOnlyPortal/ClientOnlyPortal";
import classes from "./GameConsole.module.scss";
import LifeCounter from "./LifeCounter";

const GameConsole = (props) => {
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const { life } = player;
  const currentScore = player[`score${player.currentLevel + 1}`];

  return (
    <ClientOnlyPortal selector="[data-fixed]">
      <div className={classes.screen}>
        <div className={classes.bg}>
          <Button
            className={classes.profile}
            src={player.headimgurl}
            color="white"
            type="circle"
            ring={false}
          />

          <div className={classes.controls}>
            <div className={classes.control}>
              <Button color="white" type="circle" ring={false}>
                <LifeCounter life={life} />
              </Button>
              <span className={classes.label}>动力值</span>
            </div>

            <div className={classes.control}>
              <Button color="white" type="circle" ring={false}>
                {currentScore}
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
