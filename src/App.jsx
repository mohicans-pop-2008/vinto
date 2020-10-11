/* global JitsiMeetJS config */
import './App.css';
import { hot } from 'react-hot-loader';
import React, { useEffect, useState, useCallback } from 'react';
import $ from 'jquery';
import { Video, Audio } from './components';

window.$ = $;

const loadAndConnect = ({ domain, room }) => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = `https://${domain}/libs/lib-jitsi-meet.min.js`;
  document.querySelector('head').appendChild(script);
  script.onload = async () => {
    console.log('=============> lib-jitsi-meet Loaded <=============');
    JitsiMeetJS.init();
    const configScript = document.createElement('script');
    configScript.src = `https://${domain}/config.js`;
    document.querySelector('head').appendChild(configScript);
    configScript.onload = async () => {
      console.log('=============> jitsi config Loaded <=============');
      config.serviceUrl = config.websocket || config.bosh;
      config.serviceUrl += `?room=${room}`;
      const connection = new JitsiMeetJS.JitsiConnection(
        null,
        undefined,
        config,
      );
      connection.addEventListener(
        JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
        async () => {
          console.log('=============> CONNECTION ESTABLISHED <=============');
          const conference = connection.initJitsiConference(room, {});
          await conference.join();
          console.log('=============> CONFERENCE JOINED <=============');
          const localTracks = await JitsiMeetJS.createLocalTracks(
            { devices: ['video', 'audio'], facingMode: 'user' },
            true,
          );
          console.log(
            '=============> Video & Audio Tracks Created <=============',
          );
          const localVideoTrack = localTracks.find(
            (track) => track.getType() === 'video',
          );
          const localAudioTrack = localTracks.find(
            (track) => track.getType() === 'audio',
          );
          conference.addTrack(localVideoTrack);
          conference.addTrack(localAudioTrack);
          console.log(
            '=============> Video & Audio Tracks Connected <=============',
          );
          resolve({ conference, localVideoTrack });
        },
      );
      await connection.connect();
    };
  };
});

const message = 'Welcome to vinto';

const App = () => {
  const [conference, setConference] = useState(null);
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  useEffect(() => {
    if (!conference) return;
    const addTrack = (track) => {
      if (track.getType() === 'video') setVideoTracks([...videoTracks, track]);
      if (track.getType() === 'audio') setAudioTracks([...audioTracks, track]);
    };

    const removeTrack = (track) => {
      if (track.getType() === 'video') setVideoTracks(videoTracks.filter((video) => video.getId() !== track.getId()));
      if (track.getType() === 'audio') setAudioTracks(audioTracks.filter((audio) => audio.getId() !== track.getId()));
    };
    conference.on(JitsiMeetJS.events.conference.TRACK_ADDED, addTrack);
    conference.on(JitsiMeetJS.events.conference.TRACK_REMOVED, removeTrack);
  }, [videoTracks, audioTracks, conference]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { conference, localVideoTrack } = await loadAndConnect({
      domain: 'meet.jit.si',
      room: 'some-default-room',
    });
    setConference(conference);
    setVideoTracks([...videoTracks, localVideoTrack]);
  };

  return (
    <div className="App">
      <h1>{message}</h1>
      {videoTracks.length ? (
        <div>
          {videoTracks.map((video) => (
            <Video key={video.getId()} track={video} />
          ))}
          {audioTracks.map((audio) => (
            <Audio key={audio.getId()} track={audio} />
          ))}
        </div>
      ) : (
          <form onSubmit={(e) => onSubmit(e)}>
            <button type="submit">Connect to this Conference!</button>
          </form>
        )}
    </div>
  );
};

export default hot(module)(App);
