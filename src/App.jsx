import React, { useEffect, useState, useCallback } from "react";
import regeneratorRuntime from "regenerator-runtime";

const createRandomNum = () => Math.floor(Math.random() * 10000);

const loadAndConnect = ({ room }) => {
  const conference = {
    room: "abc",
    on: function (eventType, fn) {
      console.log("Registering event listener");
      const elem = document.getElementById("root");
      elem.addEventListener(eventType, fn);
    },
    removeEventListener: function (eventType, fn) {
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

window.setTimeout(mimicAddTrack, 4000);

function mimicAddTrack() {
  console.log("MIMIC ADD TRACK FIRED");
  const trackAdded = new Event("TRACK_ADDED");
  const root = document.getElementById("root");
  root.dispatchEvent(trackAdded);
}

const App = () => {
  console.log("RENDERED");
  const [conference, setConference] = useState(null);
  const [tracks, setTracks] = useState([]);

  const connect = (e) => {
    e.preventDefault();
    const { conference: alias, localTrack } = loadAndConnect({
      room: "some-default-room",
    });
    setConference(alias);
    setTracks([...tracks, localTrack]);
  };

  const respondToTrackAdded = useCallback(
    function (e) {
      console.log("target --->", e.target);
      console.log("React app detects TRACK_ADDED");
      console.log("tracks before", tracks);
      const trackId = createRandomNum();
      const newTrack = { id: trackId };
      const newTracksArray = [...tracks, newTrack];
      console.log("tracks array", newTracksArray);
      setTracks(newTracksArray);
    },
    [tracks]
  );

  const registerEventListener = (e) => {
    console.log("Button clicked -->", e.target);
    conference.on("TRACK_ADDED", respondToTrackAdded);
  };

  useEffect(() => {
    console.log("Conference changed");
    if (!conference) return;
    conference.on("TRACK_ADDED", respondToTrackAdded);
  }, [conference]);

  // useEffect(() => {
  //   console.log('This is basically component did mount')
  // }, [])

  // useEffect(() => {
  //   mimicAddTrack()
  // }, [tracks])

  return (
    <div>
      {createRandomNum()}
      <button type="submit" onClick={connect}>
        Connect
      </button>
      {conference && (
        <button type="submit" onClick={registerEventListener}>
          Update event listener for tracks added
        </button>
      )}
      {conference && conference.room}
      {tracks && tracks.type}
    </div>
  );
};

export default App;
