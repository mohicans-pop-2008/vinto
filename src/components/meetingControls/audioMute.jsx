import React, { useState } from 'react';
import buttonStyle from '../style';

// This component can modularize for track type. For now just calling it mute
const AudioMute = ({ track }) => {
  const [muted, setMuted] = useState(true);

  const onClick = () => {
    muted ? track.unmute() : track.mute();
    setMuted(!muted);
  };

  return (
    <button type="button" style={buttonStyle} onClick={onClick}>
      {muted ? 'Unmute mic' : 'Mute mic'}
    </button>
  );
};

export default AudioMute;
