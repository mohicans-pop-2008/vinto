import React from 'react';
import ScreenShare from './screenShare';
import Mute from './mute';
import RaiseHand from './raiseHand';

const Controls = (props) => (
  <div>
    <ScreenShare />
    <Mute />
    <Mute />
    <RaiseHand />
  </div>
);

export default Controls;
