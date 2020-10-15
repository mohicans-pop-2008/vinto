import React from 'react';
import { useSelector } from 'react-redux';

const Hands = () => {
  const onClick = () => {
    console.log('==================THIS WILL EVENTUALLY BE REPLACED WITH expanding/collapsing an element to show whos hands are raised!==================');
  };
  const HandsRaised = useSelector((state) => state.raiseHand);
  return (
    <button type="button" onClick={onClick}>
      {`Number of hands raised: ${HandsRaised.length}`}
    </button>
  );
};

export default Hands;
