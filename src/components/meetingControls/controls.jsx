import React from 'react';
import ScreenShare from './screenShare';
import Mute from './mute';
import RaiseHand from './raiseHand';
import Emoji from './emoji';

const Controls = ({ toggleMute, uniqueID }) => (
  <div>
    <ScreenShare />
    <Mute toggleMute={toggleMute} trackType="video" />
    <Mute toggleMute={toggleMute} trackType="audio" />
    <RaiseHand uniqueID={uniqueID} />

    <Emoji />
  </div>
);

export default Controls;
