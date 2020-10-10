import './App.css';
import { hot } from 'react-hot-loader';
import React, { useState, useCallback } from 'react';
import $ from 'jquery';

window.$ = $;

async function connectionSuccessful(room, conference, localVideoTrack) {
  console.log('=============> CONNECTION SUCCESSFUL <=============');
  conference = this.initJitsiConference(room, {});
  conference.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => console.log('!!!!!!!CONFERENCE JOINED'));
  conference.join();
  const localTracks = await JitsiMeetJS.createLocalTracks({ devices: ['video', 'audio'], facingMode: 'user' }, true);
  localVideoTrack = localTracks.find((track) => track.getType() === 'video');
  const localAudioTrack = localTracks.find((track) => track.getType() === 'audio');
  conference.addTrack(localVideoTrack);
  conference.addTrack(localAudioTrack);
  console.log('=============> Video & Audio connected <=============');
}

const connectionFailed = () => {
  console.log('=============> CONNECTION FAILED <=============');
};

const loadAndConnect = async ({ domain, room }) => {
  const script = document.createElement('script');
  script.src = `https://${domain}/libs/lib-jitsi-meet.min.js`;
  document.querySelector('head').appendChild(script);

  let conference;
  let localVideoTrack;
  script.onload = async () => {
    JitsiMeetJS.init();
    const configScript = document.createElement('script');
    configScript.src = `https://${domain}/config.js`;
    document.querySelector('head').appendChild(configScript);
    configScript.onload = async () => {
      config.serviceUrl = config.websocket || config.bosh;
      config.serviceUrl += `?room=${room}`;
      const connection = new JitsiMeetJS.JitsiConnection(null, undefined, config);
      connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
        connectionSuccessful.bind(connection, room, conference, localVideoTrack));
      connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED,
        connectionFailed);
      await connection.connect();
    };
  };
  return { conference, localVideoTrack };
};

const message = 'Welcome to vinto';
const App = () => {
  const [currentConf, setConference] = useState(null);
  // for our purposes, we just want to connect immediately upon load for now.
  const { conference, localVideoTrack } = loadAndConnect({ domain: 'meet.jit.si', room: 'some-default-room' });
  // !! NEED TO WRAP setConference in a useEffect hook - otherwise infinite re-renderings happen each time we attempt to load and Connect. Commented out everything below for now, time to sleep!
  // setConference(conference);
  // const [videoTracks, addVideoTrack, removeVideoTrack] = useTracks();
  // const [audioTracks, addAudioTrack, removeAudioTrack] = useTracks();

  // const addTrack = useCallback((track) => {
  //   if (track.getType() === 'video') addVideoTrack(track);
  //   if (track.getType() === 'audio') addAudioTrack(track);
  // }, [addVideoTrack, addAudioTrack]);

  // const removeTrack = useCallback((track) => {
  //   if (track.getType() === 'video') removeVideoTrack(track);
  //   if (track.getType() === 'audio') removeAudioTrack(track);
  // }, [removeAudioTrack, removeVideoTrack]);

  return (
    <div className="App">
      <h1>{message}</h1>
      {currentConf ? <h2>There is an active conference</h2> : <h2>There is no active conference</h2>}
    </div>
  );
};

export default hot(module)(App);
