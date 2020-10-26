import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Mic, MicOff } from "@styled-icons/feather";

// This component can modularize for track type. For now just calling it mute
const AudioMute = ({ track }) => {
  const [muted, setMuted] = useState(true);

  const onClick = () => {
    muted ? track.unmute() : track.mute();
    setMuted(!muted);
  };

  return (
    <IconButton type="button" onClick={onClick} color="inherit">
      {muted ? <Mic size="24" /> : <MicOff size="24" />}
    </IconButton>
  );
};

export default AudioMute;
