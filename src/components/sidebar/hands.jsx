import React from 'react';
import { useSelector } from 'react-redux';

const Hands = () => {
  const onClick = () => {
    console.log('==================THIS WILL EVENTUALLY BE REPLACED WITH expanding/collapsing an element to show whos hands are raised!==================');
  };
  const raisedHands = useSelector((state) => state.raisedHands);
  return (
    <button type="button" onClick={onClick}>
      {`Number of hands raised: ${raisedHands.length}`}
    </button>
  );
};

export default Hands;
