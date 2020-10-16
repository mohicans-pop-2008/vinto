import React from 'react';
import { useSelector } from 'react-redux';

const HandsModal = () => {
  const raisedHands = useSelector((state) => state.raisedHands);
  return raisedHands.map((hand) => (<div>{hand.name}</div>));
};

export default HandsModal;
