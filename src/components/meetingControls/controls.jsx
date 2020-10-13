import React from 'react';
import ScreenShare from './screenShare';
import Mute from './mute';
import RaiseHand from './raiseHand';

const Controls = ({ toggleMute }) => (
  <div>
    <ScreenShare />
    <Mute toggleMute={toggleMute} trackType="video" />
    <Mute toggleMute={toggleMute} trackType="audio" />
    <RaiseHand />
  </div>
);

export default Controls;
