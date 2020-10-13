import React from 'react';

const Video = ({ track }) => {
  console.log(`=====> Video track is Muted: ${track.isMuted()} <=====`);
  return (
    <div>
      {track.isMuted() ? (
        <div height="250px" background="black">
          <h3 color="white">Camera is off</h3>
        </div>
      ) : (
        <video
          height="250px"
          autoPlay="1"
          ref={(ref) => ref && track.attach(ref)}
        />
      )}
    </div>
  );
};

export default Video;
