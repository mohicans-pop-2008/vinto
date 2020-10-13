import React from 'react';
import Video from './video';
import Audio from './audio';
import styles from './conference.module.css';

const Conference = ({ videoTracks, audioTracks }) => (
  <div className={styles.conference}>
    {videoTracks.map((video) => (
      <Video key={video.getId()} track={video} />
    ))}
    {audioTracks.map((audio) => (
      <Audio key={audio.getId()} track={audio} />
    ))}
  </div>
);

export default Conference;
