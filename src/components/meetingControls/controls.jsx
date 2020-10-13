import React from 'react';
import ScreenShare from './screenShare';
import Mute from './mute';
import RaiseHand from './raiseHand';

const Controls = (props) => {
  const { toggleMute, uniqueID } = props;
  return (
    <div>
      <ScreenShare />
      <Mute toggleMute={toggleMute} trackType="video" />
      <Mute toggleMute={toggleMute} trackType="audio" />
      <RaiseHand uniqueID={uniqueID} />
    </div>
  );
};

export default Controls;
