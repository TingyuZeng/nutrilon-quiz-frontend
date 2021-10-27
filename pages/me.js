import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Link from "next/link";

import Bg from "../component/ui/Background/Bg";
import Nav from "../component/ui/Header/Nav";
import Button from "../component/ui/Button/Button";
import classNames from "../lib/classNames";

import classes from "../styles/Me.module.scss";
import StatusBar from "../component/ui/StatusBar/StatusBar";
import LevelRing from "../component/ui/LevelRing/LevelRing";
import useScreenSize from "../hooks/useScreenSize";
import Img from "../component/ui/Image/Img";
import { getAvatar, getBadge } from "../lib/brandAssets";
import { playerActions, syncPlayerData } from "../store/playerSlice";
import { uiActions } from "../store/uiSlice";
import { useRouter } from "next/router";

const Me = () => {
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const [levels, setLevels] = useState([]);
  useEffect(() => {
    setLevels(
      [0, 1, 2, 3].map((index) =>
        index < player.currentLevel ? "active" : "inactive"
      )
    );
  }, [player.currentLevel]);

  const { width } = useScreenSize();

  const [badge, setBadge] = useState({ received: 0, todo: 4 });
  useEffect(() => {
    setBadge({ received: player.currentLevel, todo: 4 - player.currentLevel });
  }, [player.currentLevel]);

  const [avatarClassName, setAvatarClassName] = useState(classes.mom);
  useEffect(() => {
    setAvatarClassName([classes.mom, classes.dad, classes.baby][player.avatar]);
  }, [player.avatar]);

  const editProfileHandler = () => {
    dispatch(
      uiActions.showNotification({
        text: "您想要更改您的昵称吗？\r\n为确保您的游戏身份和微信身份一致，本游戏采用您的微信名为用户名。\r\n如果您想要修改您在游戏或者验证证书中的名字，您需要退出本游戏后修改您的微信名并重新登陆即可。",
        qrcode: true,
        handler: "close",
      })
    );
  };

  const getCertificateHandler = () => {
    const certifiedDate = Date();
    dispatch(
      syncPlayerData({
        lastCertificateDate: certifiedDate,
        certificates: [
          ...player.certificates,
          { date: certifiedDate, cohort: 1 },
        ],
      })
    );

    // dispatch notification and website link
    dispatch(uiActions.showSync());
    setTimeout(() => {
      dispatch(uiActions.hideSync());
      dispatch(
        uiActions.showNotification({
          title: "恭喜你",
          text: "请点击下方按钮前往查询你的证书。",
          handler: "goToVerify",
        })
      );
    }, 5000);
  };

  const exitHandler = () => {
    dispatch(
      uiActions.showNotification({
        text: "您确定要退出本次探索吗？",
        qrcode: true,
        handler: "logout",
      })
    );
  };

  return (
    <>
      <Bg />
      <Nav
        title="我的资料"
        containerClassName={classes.nav}
        className={classes.heading}
        rightIcon="/icons/icon-pen.svg"
        rightAlt="icon of pen"
        rightClickHandler={editProfileHandler}
      />

      <section className={classes.info}>
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
        <h2>{player.nickname}</h2>
        <div className={classes.status}>
          <StatusBar title="能量值" status={player.scoreTotal} />
          <StatusBar title="动力值" status={player.life} />
        </div>
      </section>

      <section className={classes.asset}>
        <h3>下载素材</h3>
        <p>您可以下载已探索城市的相关素材</p>
        <motion.div
          drag="x"
          dragConstraints={{ left: -600 + width, right: 0 }}
          className={classes.levels}
        >
          <LevelRing
            level={0}
            status={levels[0]}
            text="祖特梅尔"
            className={classes.level}
          />
          <LevelRing
            level={1}
            status={levels[1]}
            text="乌得勒支"
            className={classes.level}
          />
          <LevelRing
            level={2}
            status={levels[2]}
            text="克伊克"
            className={classes.level}
          />
          <LevelRing
            level={3}
            status={levels[3]}
            text="阿姆斯特丹"
            className={classes.level}
          />
        </motion.div>
      </section>

      <section className={classes.puzzle}>
        <h3>智慧拼图收集进度</h3>
        <p>您已收集了{badge.received}枚智慧拼图</p>
        {badge.todo !== 0 && <p>还差{badge.todo}枚拼图便可通过验证</p>}
        {badge.todo === 0 && <p>请点击下方按钮领取您的证书</p>}
        <div className={classes.badge}>
          <Img {...getBadge(badge.received)} />
          <Button
            size="m"
            active={badge.todo === 0}
            color={badge.todo === 0 ? "gold" : "gray"}
            className={classes.btn}
            onClick={badge.todo === 0 ? getCertificateHandler : null}
          >
            {badge.todo === 0 ? "领取证书" : "未验证"}
          </Button>
          <Img
            {...getAvatar(player.avatar ?? 2)}
            className={classNames(
              classes.avatar,
              avatarClassName || classes.baby
            )}
          />
        </div>
      </section>

      <section className={classes.actions}>
        <h3>游戏账号</h3>
        <p>
          <Link href="/manual">游戏说明</Link>
        </p>
        <p className={classes.danger}>
          <span onClick={exitHandler}>退出游戏</span>
        </p>
      </section>
    </>
  );
};

export default Me;
