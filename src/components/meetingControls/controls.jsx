import React from 'react';
import ScreenShare from './screenShare';
import Mute from './mute';
import RaiseHand from './raiseHand';

const Controls = (props) => {
  const { name, toggleMute, uniqueID } = props;
  return (
    <div>
      <ScreenShare />
      <Mute toggleMute={toggleMute} trackType='video' />
      <Mute toggleMute={toggleMute} trackType='audio' />
      <RaiseHand name={name} uniqueID={uniqueID} />
    </div>
  );
};

export default Controls;
