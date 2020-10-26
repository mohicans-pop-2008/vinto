import React from "react";
import ScreenShare from "./screenShare";
import VideoMute from "./videoMute";
import AudioMute from "./audioMute";
import RaiseHand from "./raiseHand";
import Emoji from "./emoji";
import Leave from "./leave";

import { controlbarStyle } from "../style";

const Controls = ({ localTracks, leave, name, id }) => (
  <div style={controlbarStyle}>
    <ScreenShare />
    <VideoMute
      track={localTracks.filter((track) => track.getType() === "video")[0]}
    />
    <AudioMute
      track={localTracks.filter((track) => track.getType() === "audio")[0]}
    />
    <RaiseHand name={name} id={id} />
    <Emoji />
    <Leave tracks={localTracks} leave={leave} />
  </div>
);

export default Controls;
