import React from 'react';
import ScreenShare from './screenShare';
import Mute from './mute';
import RaiseHand from './raiseHand';

const Controls = (props) => (
  <div>
    <ScreenShare />
    <Mute toggleMute={props.toggleMute} trackType='video' />
    <Mute toggleMute={props.toggleMute} trackType='audio' />
    <RaiseHand />
  </div>
);

export default Controls;
