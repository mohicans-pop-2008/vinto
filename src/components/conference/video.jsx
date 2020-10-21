import React from "react";
import styles from "./video.module.css";

const Video = ({ track, n }) => {
  if (track) {
    console.log(
      `=====> Video track ${track.getId()} is Muted: ${track.isMuted()} <=====`
    );

    return (
      <div
      style={{ width: `calc(100% / ${n})` }}
        className={styles.videoTile}
      >
        <video
          className={styles.videoTrack}
          autoPlay="1"
          ref={(ref) => ref && track.attach(ref)}
        />
      </div>
    );
  }
  return <h3 color="white">Camera is off</h3>
};

export default Video;
