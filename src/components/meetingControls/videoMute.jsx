import React, { useState } from 'react';
import buttonStyle from '../style';

// This component can modularize for track type. For now just calling it mute
const VideoMute = ({ track }) => {
  const [muted, setMuted] = useState(false);

  const onClick = () => {
    muted ? track.unmute() : track.mute();
    setMuted(!muted);
  };

  return (
    <button type="button" style={buttonStyle} onClick={onClick}>
      {muted ? 'Turn on video' : 'Turn off video'}
    </button>
  );
};

export default VideoMute;
