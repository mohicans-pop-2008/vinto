import React, { useState } from 'react';

// This component can modularize for track type. For now just calling it mute
const Mute = ({trackType, toggleMute}) => {
  const [muted, setMuted] = useState(false);

  const onClick = () => {
    setMuted(!muted);
    toggleMute(trackType);
  };

  return (
    <button type="button" onClick={onClick}>
      {trackType === 'video'
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
