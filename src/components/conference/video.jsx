import React from 'react';
import styles from './video.module.css';

const videoTile = {
  background: '#93a1a1',
  border: '3px dotted #d33682',
  minHeight: '200px',
  maxWidth: '100%',
  minWidth: '150px',
  maxHeight: '100%',
  flexBasis: '100%',
  flexGrow: '1',
  flexShrink: '1',
  display: 'flex',
  width: 'calc(100%)',
};

const Video = ({ track }) => {
  console.log(
    `=====> Video track ${track.getId()} is Muted: ${track.isMuted()} <=====`
  );
  return (
    <>
      {track.isMuted() ? (
        <h3 color="white">Camera is off</h3>
      ) : (
        <div style={videoTile}>
          <video
            className={styles.videoTrack}
            autoPlay="1"
            ref={(ref) => ref && track.attach(ref)}
          />
        </div>
      )}
    </>
  );
};

export default Video;
