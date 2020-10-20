import React, { useState } from 'react';

// This component can modularize for track type. For now just calling it mute
const Mute = ({ track }) => {
  const [muted, setMuted] = useState(true);

  const onClick = () => {
    muted ? track.unmute() : track.mute()
    setMuted(!muted);
  };

  return (
    <button type="button" onClick={onClick}>
      {track.getType() === 'video'
        ? muted
          ? 'Turn on video'
          : 'Turn off video'
        : muted
          ? 'Unmute mic'
          : 'Mute mic'}
    </button>
  );
};

export default Mute;
