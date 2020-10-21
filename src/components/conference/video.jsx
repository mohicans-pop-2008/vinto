import React from "react";
import styles from "./video.module.css";

const Video = ({ track, n }) => {
  console.log(
    `=====> Video track ${track.getId()} is Muted: ${track.isMuted()} <=====`
  );

  /**
   * Layout
   *
   * this is a div container for the video element
   * it should have a calculated height and width
   * it should have some fallback content - ID for now, ideally a display name
   */
  const aspectRatio = 16 / 9; // what is the actual aspectRatio for Jitsi tracks?

  const fallback = track.getParticipantId();
  return (
    <>
      <div style={{ width: `calc(100% / ${n})` }} className={styles.videoTile}>
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
    </>
  );
};

export default Video;
