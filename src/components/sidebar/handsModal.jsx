import React from 'react';
import { useSelector } from 'react-redux';
import styles from "./hand.module.css";

const HandsModal = () => {
  const raisedHands = useSelector((state) => state.raisedHands);
  return (<div className={styles.modal}>{raisedHands.map((hand, index) => (<div>{`${index+1}. ${hand.name}`}</div>))}</div>)
};

export default HandsModal;
