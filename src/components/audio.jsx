import React from 'react';

const Audio = (props) => {
  if (props.track.isLocal()) {
    return null;
  }
  return <audio autoPlay="1" ref={(ref) => ref && track.attach(ref)} />;
};

export default Audio;
