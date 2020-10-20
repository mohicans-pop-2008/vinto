import React from "react";
import styles from "./video.module.css";

const Video = ({ track, n }) => {
  console.log(
    `=====> Video track ${track.getId()} is Muted: ${track.isMuted()} <=====`
  );

  return (
    <>
      {track.isMuted() ? (
        <h3 color="white">Camera is off</h3>
      ) : (
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
      )}
    </>
  );
};

export default Video;
