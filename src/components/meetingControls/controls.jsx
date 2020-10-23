import React from 'react';
import ScreenShare from './screenShare';
import VideoMute from './videoMute';
import AudioMute from './audioMute';
import RaiseHand from './raiseHand';
import Emoji from './emoji';
import { controlbarStyle } from '../style';

const Controls = ({ localTracks, name, id }) => (
  <div style={controlbarStyle}>
    <ScreenShare />
    <VideoMute
      track={localTracks.filter((track) => track.getType() === 'video')[0]}
    />
    <AudioMute
      track={localTracks.filter((track) => track.getType() === 'audio')[0]}
    />
    <RaiseHand name={name} id={id} />
    <Emoji />
  </div>
);

export default Controls;
