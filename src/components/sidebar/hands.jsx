import React from "react";
import { useSelector } from "react-redux";
import { Hand } from "@styled-icons/entypo/Hand";
import styles from "./hand.module.css";

const Hands = () => {
  const onClick = () => {
    console.log(
      "==================THIS WILL EVENTUALLY BE REPLACED WITH expanding/collapsing an element to show whos hands are raised!=================="
    );
  };
  const raisedHands = useSelector((state) => state.raisedHands);
  return (
    <button
      type="button"
      className={raisedHands.length ? styles.handsRaised : styles.none}
      onClick={onClick}
    >
      <Hand size="24" title="Hands Raised" />
      {`${raisedHands.length}`}
    </button>
  );
};

export default Hands;
