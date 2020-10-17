import React, { useEffect, useState, useCallback } from "react";
import regeneratorRuntime from "regenerator-runtime";

/**
 * Random Number Generator
 *
 * You get a number and you get a number!
 */

const createRandomNum = () => Math.floor(Math.random() * 10000);

/**
 * MOCK Jitsi Connection Functionality
 *
 * Called by our React application when someone tries to join
 * the conference by clicking the join conference button.
 */

const loadAndConnect = ({ room }) => {
  const conference = {
    room: "abc",
    on: function (eventType, fn) {
      console.log("Registering event listener");
      const elem = document.getElementById("root");
      elem.addEventListener(eventType, fn);
    },
    removeEventListener: function (eventType, fn) {
      console.log("Removing an old event listener");
      const elem = document.getElementById("root");
      elem.removeEventListener(eventType, fn);
    },
  };
  const localTrack = { type: "video" };
  return {
    conference,
    localTrack,
  };
};

/**
 * MOCK Jitsi Meet Server
 *
 * Emits a TRACK_ADDED event 5 times (to mimic 5 people joining)
 */

function mimicAddTrack() {
  console.log("MIMIC ADD TRACK FIRED");
  const trackAdded = new Event("TRACK_ADDED");
  const root = document.getElementById("root");
  root.dispatchEvent(trackAdded);
}

(async () => {
  let x = 5;
  while (x > 0) {
    window.setTimeout(mimicAddTrack, x * 2000);
    x--;
  }
})();

/**
 * REACT application starts
 */

const App = () => {
  console.log("RENDERED or RE-RENDERED");
  const [conference, setConference] = useState(null);
  const [tracks, setTracks] = useState([]);

  /**
   * EVENT HANDLERS
   *
   * #connect - handles the onClick event of the connect button
   * #respondToTrackAdded - handles the TRACK_ADDED event, and expect
   *   to update the state.
   */

  const connect = (e) => {
    e.preventDefault();
    const { conference: alias, localTrack } = loadAndConnect({
      room: "some-default-room",
    });
    setConference(alias);
    setTracks([...tracks, localTrack]);
  };

  const respondToTrackAdded = (e) => {
    console.log("target --->", e.target);
    console.log("React app detects TRACK_ADDED");
    console.log("tracks before", tracks);
    const trackId = createRandomNum();
    const newTrack = { id: trackId };
    const newTracksArray = [...tracks, newTrack];
    console.log("tracks array", newTracksArray);
    setTracks(newTracksArray);
  };

  /**
   * REACT EFFECT HOOKS
   *
   * These detect changes in state and perform necessary actions
   * in response.
   */

  useEffect(() => {
    console.log("Either track or conference changed");
    if (!conference) return;
    conference.on("TRACK_ADDED", respondToTrackAdded);
    return () => {
      conference.removeEventListener("TRACK_ADDED", respondToTrackAdded);
    };
  }, [tracks, conference]);

  /**
   * RENDER METHOD
   */

  return (
    <div>
      {createRandomNum()}
      <button type="submit" onClick={connect}>
        Join (Or start ...) Conference
      </button>
      {conference && conference.room}
      {tracks && tracks.type}
    </div>
  );
};

export default App;
