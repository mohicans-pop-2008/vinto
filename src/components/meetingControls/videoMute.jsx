import React, { useState } from "react";
import buttonStyle from "../style";
import IconButton from "@material-ui/core/IconButton";
import { VideoOff, Video } from "@styled-icons/feather";

// This component can modularize for track type. For now just calling it mute
const VideoMute = ({ track }) => {
  const [muted, setMuted] = useState(false);

  const onClick = () => {
    muted ? track.unmute() : track.mute();
    setMuted(!muted);
  };

  return (
    <IconButton type="button" onClick={onClick} color="inherit">
      {muted ? <Video size="24" /> : <VideoOff size="24" />}
    </IconButton>
  );
};

export default VideoMute;
