import React, { useState, useCallback, useEffect, useRef } from "react";
import Video from "./video";
import Audio from "./audio";
import styles from "./conference.module.css";
import { debounce } from "lodash";

const Conference = ({ tracks }) => {
  const [layout, setLayout] = useState({});
  const conferenceDiv = useRef(null); // {current: DOM Element(div)}
  const participants = {};
  Object.keys(tracks).forEach((key) => {
    let parsedId = key.split("-");
    let id = parsedId[0];
    participants[id] = true;
  });

  // Compute layout should the conferenceDiv reference
  // ever change
  const computeAndSetLayout = useCallback(() => {
    if (!conferenceDiv) return;
    conferenceDivHeight = conferenceDiv.current.getBoundingClientRect().height;
    conferenceDivWidth = conferenceDiv.current.getBoundingClientRect().width;
    console.log(
      `Vinto: computeAndSetLayout runs participantCount: ${participantCount}, conferenceDivHeight: ${conferenceDivHeight}, and conferenceDivWidth: ${conferenceDivWidth}.`
    );
    setLayout((layout) =>
      calculateBestLayout(conferenceDivHeight, conferenceDivWidth)
    );
  }, [conferenceDiv]);

  const windowResizeListener = useRef(debounce(computeAndSetLayout, 1000))
    .current;

  useEffect(() => {
    window.addEventListener("resize", windowResizeListener);
  }, [windowResizeListener]);

  const logWindowHeight = () => {
    console.log("Height --> ", window.innerHeight);
  };

  /* Layout Math
   * this is a div container for the video element
   * it should have a calculated height and width
   * it should have some fallback content - ID for now, ideally a display name
   */

  const participantCount = Object.keys(participants).length;
  let conferenceDivHeight;
  let conferenceDivWidth;

  const calculateBestLayout = (conHeight, conWidth) => {
    console.log(`Vinto: conHeight = ${conHeight} and conWidth = ${conWidth}`);

    if (!conHeight || !conWidth) return;
    const aspectRatio = 16 / 9; // what is the actual aspectRatio for Jitsi tracks?
    let bestLayout = {
      area: 0,
      cols: 0,
      rows: 0,
      width: 0,
      height: 0,
    };
    // brute-force search layout where video occupy the largest area of the container
    for (let cols = 1; cols <= participantCount; cols++) {
      console.log("Vinto: is calculating bestLayout");
      const rows = Math.ceil(participantCount / cols);
      const hScale = conWidth / (cols * aspectRatio);
      const vScale = conHeight / rows;
      let width;
      let height;
      if (hScale <= vScale) {
        width = Math.floor(conWidth / cols);
        height = Math.floor(width / aspectRatio);
      } else {
        height = Math.floor(conHeight / rows);
        width = Math.floor(height * aspectRatio);
      }
      const area = width * height;
      console.log("Vinto: bestLayout area is --> ", area);
      if (area > bestLayout.area) {
        bestLayout = {
          area,
          width,
          height,
          rows,
          cols,
        };
      }
    }
    return bestLayout;
  };

  // console.log("Vinto: layout on state --> ", layout);
  return (
    <div className={styles.conference} ref={conferenceDiv}>
      {Object.keys(tracks).map((trackKey) => {
        const element = trackKey.includes("video") ? (
          layout && (
            <Video
              key={trackKey}
              track={tracks[trackKey]}
              participantCount={participantCount}
              height={layout.height}
              width={layout.width}
            />
          )
        ) : (
          <Audio key={trackKey} track={tracks[trackKey]} />
        );
        return element;
      })}
    </div>
  );
};

export default Conference;
