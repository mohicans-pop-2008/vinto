import React, { useState } from "react";
import { useSelector } from "react-redux";
import HandsModal from "./handsModal";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { Hand } from "@styled-icons/entypo/Hand";
import styles from "./hand.module.css";

const Hands = () => {
  const [modalShowing, setModalShowing] = useState(false);
  const onClick = () => {
    setModalShowing(!modalShowing);
  };
  const raisedHands = useSelector((state) => state.raisedHands);
  return (
    <>
      <Badge badgeContent={raisedHands.length} color="secondary" className={styles.badge}>
        <IconButton
          type="button"
          className={raisedHands.length ? styles.handsRaised : styles.none}
          disabled={!raisedHands.length}
          onClick={onClick}
        >
          <Hand size="24" title="Hands Raised" />
        </IconButton>
      </Badge>
      {modalShowing ? <HandsModal /> : null}
    </>
  );
};

export default Hands;
