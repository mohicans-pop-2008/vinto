import React from 'react';
import { useSelector } from 'react-redux';
import buttonStyle from '../style';

const Hands = () => {
  const onClick = () => {
    console.log(
      '==================THIS WILL EVENTUALLY BE REPLACED WITH expanding/collapsing an element to show whos hands are raised!=================='
    );
  };
  const raisedHands = useSelector((state) => state.raisedHands);
  return (
    <button type="button" style={buttonStyle} onClick={onClick}>
      {`Number of hands raised: ${raisedHands.length}`}
    </button>
  );
};

export default Hands;
