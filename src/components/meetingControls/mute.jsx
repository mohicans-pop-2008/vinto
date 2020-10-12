import React from 'react';

// This component can modularize for track type. For now just calling it mute
const Mute = (props) => (
  // props.track.getType() === 'video' -> render a Video On/Off Button
  // props.track.getType() === 'audio' -> renders a Mute/Unmute Button
  <button onClick={props.mute}>Mute Button</button>
);

export default Mute;
