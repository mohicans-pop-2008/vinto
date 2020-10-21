import React, { useState } from "react";
import styles from "./video.module.css";

const Video = ({ track, participantCount, height, width }) => {
  console.log(
    `=====> Video track ${track.getId()} is Muted: ${track.isMuted()} <=====`
  );

  const fallback = track.getParticipantId();
  return (
    <div style={{ height: height, width: width }} className={styles.videoTile}>
      {track.isMuted() ? (
        <h3 color="white">{fallback}</h3>
      ) : (
        <video
          className={styles.videoTrack}
          autoPlay="1"
          ref={(ref) => ref && track.attach(ref)}
        />
      )}
    </div>
  );
};

export default Video;
