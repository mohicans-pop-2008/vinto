import React from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import styles from "./hand.module.css";

const HandsModal = () => {
  const raisedHands = useSelector((state) => state.raisedHands);
  return (
    <div className={styles.modal}>
      {raisedHands.map((hand, index) => (
        <div key={index}>
          <Typography>{`${index + 1}. ${hand.name}`}</Typography>
        </div>
      ))}
    </div>
  );
};

export default HandsModal;
