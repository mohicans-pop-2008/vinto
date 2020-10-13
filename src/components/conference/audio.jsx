import React from 'react';

const Audio = (props) => {
  const { track } = props;
  return <audio autoPlay="1" ref={(ref) => ref && track.attach(ref)} />;
};

export default Audio;
