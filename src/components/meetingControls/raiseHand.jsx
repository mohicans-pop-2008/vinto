import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { raiseHand, lowerHand } from '../../store';

const RaiseHand = ({ name, uniqueID }) => {
  const [handRaised, setHandRaised] = useState(false);
  const dispatch = useDispatch();
  const onClick = () => {
    if (handRaised) {
      dispatch(lowerHand({ name, uniqueID }));
    } else {
      dispatch(raiseHand({ name, uniqueID }));
    }
    setHandRaised(!handRaised);
  };
  return (
    <button type="button" onClick={onClick}>
      {handRaised
        ? 'Lower my hand'
        : 'Raise my hand'}
    </button>
  );
};

export default RaiseHand;
