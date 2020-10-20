import React from "react";
import Video from "./video";
import Audio from "./audio";
import styles from "./conference.module.css";

const Conference = ({ tracks }) => {

  const participants = {};
  Object.keys(tracks).forEach((key) => {
    let parsedId = key.split('-')
    let id = parsedId[0]
    participants[id] = true;
  });
  const n = Object.keys(participants).length

  return (
    <div className={styles.conference}>
      {Object.keys(tracks).map((trackKey) => {
        const element = trackKey.includes("video") ? (
          <Video key={trackKey} track={tracks[trackKey]} n={n} />
        ) : (
          <Audio key={trackKey} track={tracks[trackKey]} />
        );
        return element;
      })}
    </div>
  );
};

export default Conference;
