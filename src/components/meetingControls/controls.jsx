import React from 'react';
import ScreenShare from './screenShare';
import Mute from './mute';
import RaiseHand from './raiseHand';
import Emoji from './emoji';

const Controls = ({ localTracks }) => (
  <div>
    <ScreenShare />
    <Mute track={localTracks.filter((track) => track.getType() === "video")[0]} />
    <Mute track={localTracks.filter((track) => track.getType() === "audio")[0]} />
    <RaiseHand />
    <Emoji />
  </div>
);

export default Controls;
