import React from 'react';
import Video from './video';
import Audio from './audio';
import styles from './conference.module.css';

const Conference = ({ tracks }) => (
  <div className={styles.conference} >
    {Object.keys(tracks)
      .map((trackKey) => {
        const element = trackKey.includes("video")
          ? <Video key={trackKey} track={tracks[trackKey]} />
          : <Audio key={trackKey} track={tracks[trackKey]} />
        return element;
        }
      )}
  </div>
);

export default Conference;
