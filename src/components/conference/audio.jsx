import React from 'react';

const Audio = (props) => {
  const { track } = props;
  if (track.isLocal()) {
    return null;
  }
  return <audio autoPlay="1" ref={(ref) => ref && track.attach(ref)} />;
};

export default Audio;