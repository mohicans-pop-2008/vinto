import React, { useState } from "react";
import styles from "./video.module.css";

const Video = ({ track, participantCount, height, width }) => {
  const fallback = track.getParticipantId();

  return (
    <div style={{ height: height, width: width }} className={styles.videoTile}>
      {track ? (
        <video
          className={styles.videoTrack}
          autoPlay="1"
          ref={(ref) => ref && track.attach(ref)}
        />
      ) : (
        <h3 color="white">{fallback}</h3>
      )}
    </div>
  );
};

export default Video;
