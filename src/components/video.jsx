import React from 'react';

const Video = (props) => (
  <div>
    <video height='250px' autoPlay='1' ref={(ref) => ref && props.track.attach(ref)} />
  </div>
);

export default Video;
