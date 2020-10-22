import React, { useState } from "react";
import styles from "./video.module.css";

const Video = ({ track, height, width }) => {
  return (
    <div style={{ height: height, width: width }} className={styles.videoTile}>
      {track ? (
        <video
          className={styles.videoTrack}
          autoPlay="1"
          ref={(ref) => ref && track.attach(ref)}
        />
      ) : (
        <h3 color="white">Participant</h3>
      )}
    </div>
  );
};

export default Video;
