import React, { useState } from "react";
import styles from "./video.module.css";
import Typography from "@material-ui/core/Typography"

const Video = ({ track, name, height, width }) => {
  return (
    <div style={{ height: height, width: width }} className={styles.videoTile}>
      {track ? (
        <video
          className={styles.videoTrack}
          autoPlay="1"
          ref={(ref) => ref && track.attach(ref)}
        />
      ) : (
          <Typography variant="h3">
            {name}
          </Typography>
        )}
    </div>
  );
};

export default Video;
