import React, { useState } from 'react';
import regeneratorRuntime from 'regenerator-runtime';

const createRandomNum = () => Math.floor(Math.random() * 10000);

const loadAndConnect = async ({ room }) => {
  const conference = { room: 'abc' };
  const localTrack = { type: 'video' };
  return {
    conference,
    localTrack,
  };
};

const App = () => {
  const [conference, setConference] = useState(null);
  const [tracks, setTracks] = useState(null);

  const connect = async (e) => {
    e.preventDefault();
    const { conference, localTrack } = await loadAndConnect({
      room: 'some-default-room',
    });
    setConference(conference);
    setTracks(localTrack);
  };

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
