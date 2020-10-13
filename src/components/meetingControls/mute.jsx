import React from 'react';

// This component can modularize for track type. For now just calling it mute
const Mute = (props) => (
  <button type="button" onClick={() => props.toggleMute(props.trackType)}> Mute Button</button>
);

export default Mute;
