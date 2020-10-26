import React, { useState, useEffect, useRef } from "react";
import Video from "./video";
import Audio from "./audio";
import styles from "./conference.module.css";
import { debounce } from "lodash";

const Conference = ({ tracks, participantCount, name }) => {
  const [resized, setResized] = useState({});
  const conferenceDiv = useRef(null); // {current: DOM Element(div)}

  /* Layout Math
   * this is a div container for the video element
   * it should have a calculated height and width
   * it should have some fallback content - ID for now, ideally a display name
   */
  const calculateBestLayout = (conHeight, conWidth, participantCount) => {
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
      console.log(
        "Vinto: calculateBestLayout is iterating to find best layout"
      );
      const rows = Math.ceil(participantCount / cols);
      const hScale = conWidth / (cols * aspectRatio);
      const vScale = conHeight / rows;
      let width;
      let height;
      if (hScale <= vScale) {
        width = Math.floor(conWidth / cols)-20;
        height = Math.floor(width / aspectRatio);
      } else {
        height = Math.floor(conHeight / rows)-20;
        width = Math.floor(height * aspectRatio);
      }
      const area = width * height;
      console.log(
        `Vinto: calculateBestLayout just computed a possible layout with rows: ${rows}, columns: ${cols}, height: ${height}, and width: ${width}.`
      );
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
    console.log(
      `Vinto: calculateBestLayout runs with participantCount: ${participantCount}, conferenceDivHeight: ${conferenceDivHeight}, and conferenceDivWidth: ${conferenceDivWidth} and results in layout height of ${bestLayout.height}, width ${bestLayout.width}.`
    );
    return bestLayout;
  };

  /**
   * Get participantCount, div height and width
   */
  console.log(
    `Vinto: RENDERED: conference with ${participantCount} participants`
  );

  /**
   * On each render, calculate layout to be return value of calculateBestLayout
   */
  let conferenceDivHeight = 100;
  let conferenceDivWidth = (16 / 9) * 100;
  let layout;

  if (conferenceDiv.current) {
    conferenceDivHeight = conferenceDiv.current.getBoundingClientRect().height;
    conferenceDivWidth = conferenceDiv.current.getBoundingClientRect().width;
  }

  layout = calculateBestLayout(
    conferenceDivHeight,
    conferenceDivWidth,
    participantCount
  );

  useEffect(() => {
    window.addEventListener(
      "resize",
      debounce(() => {
        console.log("Vinto: Window resized ---> Should trigger a RENDER");
        setResized({});
      }, 1000)
    );
    return () => {
      window.removeEventListener(
        "resize",
        debounce(() => setResized({}), 1000)
      );
    };
  }, []);

  return (
    <div className={styles.conference} ref={conferenceDiv}>
      {Object.keys(tracks).map((trackKey) => {
        const element = trackKey.includes("video") ? (
          layout && (
            <Video
              key={trackKey}
              track={tracks[trackKey]}
              name={name}
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
