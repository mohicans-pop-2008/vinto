import React from 'react';
import ScreenShare from './screenShare';
import Mute from './mute';
import RaiseHand from './raiseHand';
import Emoji from './emoji';

const Controls = ({ name, toggleMute, uniqueID }) => {
  return (
    <div>
      <ScreenShare />
      <Mute toggleMute={toggleMute} trackType="video" />
      <Mute toggleMute={toggleMute} trackType="audio" />
      <RaiseHand name={name} uniqueID={uniqueID} />

      <Emoji />
    </div>
  );
};

export default Controls;
