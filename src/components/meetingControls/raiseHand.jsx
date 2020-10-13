import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { raiseHand, lowerHand } from '../../store';

const RaiseHand = ({uniqueID}) => {
  const [handRaised, setHandRaised] = useState(false);
  const dispatch = useDispatch();
  const onClick = () => {
    if (handRaised) {
      dispatch(lowerHand({ name: 'TODO-NAME', uniqueID }));
    } else {
      dispatch(raiseHand({ name: 'TODO-NAME', uniqueID }));
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
