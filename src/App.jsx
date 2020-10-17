import React, { useEffect, useState } from 'react';
import regeneratorRuntime from 'regenerator-runtime';

const createRandomNum = () => Math.floor(Math.random() * 10000);

const loadAndConnect = ({ room }) => {
  const conference = { room: 'abc' };
  const localTrack = { type: 'video' };
  return {
    conference,
    localTrack,
  };
};

window.setTimeout(mimicAddTrack, 4000);
function mimicAddTrack () {
  console.log('MIMIC ADD TRACK FIRED');
  const trackAdded = new Event('TRACK_ADDED');
  const root = document.getElementById('root')
  root.dispatchEvent(trackAdded)
}

const App = () => {
  console.log('RENDERED')
  const [conference, setConference] = useState(null);
  const [tracks, setTracks] = useState(null);

  const connect = (e) => {
    e.preventDefault();
    const { conference: alias, localTrack } = loadAndConnect({
      room: 'some-default-room',
    });
    setConference(alias);
    setTracks(localTrack);
  };

  // useEffect(() => {
  //   console.log('This is basically component did mount')
  // }, [])

  // useEffect(() => {
  //   console.log('Conference changed')
  // }, [conference])

  // useEffect(() => {
  //   mimicAddTrack()
  // }, [tracks])

  return (
    <div>
      {createRandomNum()}
      <button type="submit" onClick={connect}>
        Submit
      </button>
      {conference && conference.room}
      {tracks && tracks.type}
    </div>
  );
};

export default App;
