import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { raiseHand, lowerHand } from '../../store';
import buttonStyle from '../style';

const RaiseHand = ({ name, id }) => {
  const [handRaised, setHandRaised] = useState(false);
  const dispatch = useDispatch();
  // const name = useSelector((state) => state.name);
  const onClick = () => {
    if (handRaised) {
      dispatch(lowerHand({ uniqueID: name + id }));
    } else {
      dispatch(raiseHand({ name, uniqueID: name + id }));
    }
    setHandRaised(!handRaised);
  };
  return (
    <button type="button" style={buttonStyle} onClick={onClick}>
      {handRaised ? 'Lower my hand' : 'Raise my hand'}
    </button>
  );
};

export default RaiseHand;
