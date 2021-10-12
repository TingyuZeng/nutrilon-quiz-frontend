import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useScreenSize from "../../hooks/useScreenSize";
import { playerActions } from "../../store/playerSlice";
import { uiActions } from "../../store/uiSlice";
import Bg from "../ui/Background/Bg";
import Button from "../ui/Button/Button";
import Header from "../ui/Header/Header";
import Img from "../ui/Image/Img";

import classes from "./NotificationModal.module.scss";

const NotificationModal = () => {
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const router = useRouter();
  const containerRef = useRef(null);

  if (!ui.notificationModal) return null;

  const hideModalHandler = () => {
    dispatch(uiActions.hideNotification());
  };

  const defaultHandler = () => {
    dispatch(uiActions.hideNotification());
    router.replace("/");
  };
  const handlers = {
    logout() {
      dispatch(playerActions.logout());
      dispatch(uiActions.hideNotification());
      router.replace("/");
    },
    close() {
      dispatch(uiActions.hideNotification());
    },
  };

  return (
    <>
      <div className={classes.backdrop} onClick={hideModalHandler} />
      <div className={classes.modal} ref={containerRef}>
        <motion.div
          drag="y"
          dragConstraints={containerRef}
          className={classes.content}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "anticipate" }}
        >
          <Bg />

          <div className={classes.nav}>
            <Header className={classes.header}>新消息</Header>
            <Button
              className={classes.exit}
              type="circle"
              color="blue"
              size="m"
              src="/icons/icon-x.svg"
              onClick={hideModalHandler}
            />
          </div>

          <p className={classes.text}>
            {ui.notificationText ||
              "很抱歉，我们遇到了一些问题，请刷新本页面。"}
          </p>

          <Button
            className={classes.btn}
            onClick={handlers[ui.notificationHandler] || defaultHandler}
          />

          {ui.notificationQRCode && (
            <div className={classes.qrcode}>
              <Img
                src="https://res.cloudinary.com/npc2021/image/upload/v1634054012/DEF_QR_code_9b0b26cd75.jpg"
                objectFit="cover"
                layout="fill"
              />
              <p>长按扫描前往微信公众号</p>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default NotificationModal;
