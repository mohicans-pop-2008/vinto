import React from 'react';

const Video = (props) => (
  <div>
    Individual video window below!
    <video height='250px' autoPlay='1' ref={(ref) => props.track.attach(ref)}></video>
  </div>
);

export default Video;
