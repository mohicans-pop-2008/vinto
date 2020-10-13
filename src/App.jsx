/* global JitsiMeetJS config */
import './App.css';
import { hot } from 'react-hot-loader';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import $ from 'jquery';
import { engagementScoreChangeDetected } from './store';
import {
  Video, Audio, Controls, Sidebar,
} from './components';

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
        config
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
            true
          );
          console.log(
            '=============> Video & Audio Tracks Created <============='
          );
          const localVideoTrack = localTracks.find(
            (track) => track.getType() === 'video'
          );
          const localAudioTrack = localTracks.find(
            (track) => track.getType() === 'audio'
          );
          conference.addTrack(localVideoTrack);
          conference.addTrack(localAudioTrack);
          console.log(
            '=============> Video & Audio Tracks Connected <============='
          );
          resolve({ conference, localVideoTrack });
        }
      );
      await connection.connect();
    };
  };
});

// JITSI STANDUP CUSTOM HOOK
const useTracks = () => {
  const [tracks, setTracks] = useState([]);

  const addTrack = useCallback(
    (track) => {
      setTracks((tracks) => {
        const hasTrack = tracks.find(
          (_track) => track.getId() === _track.getId()
        );

        if (hasTrack) return tracks;

        return [...tracks, track];
      });
    },
    [setTracks]
  );

  const removeTrack = useCallback(
    (track) => {
      setTracks((tracks) =>
        tracks.filter((_track) => track.getId() !== _track.getId())
      );
    },
    [setTracks]
  );

  return [tracks, addTrack, removeTrack];
};

const message = 'Welcome to vinto';

const App = () => {
  const [conference, setConference] = useState(null);
  const [videoTracks, addVideoTrack, removeVideoTrack] = useTracks();
  const [audioTracks, addAudioTrack, removeAudioTrack] = useTracks();
  const dispatch = useDispatch();

  const addTrack = useCallback(
    (track) => {
      if (track.getType() === 'video') addVideoTrack(track);
      if (track.getType() === 'audio' && track.isLocal() === false) addAudioTrack(track);
    },
    [addVideoTrack, addAudioTrack]
  );

  const removeTrack = useCallback(
    (track) => {
      if (track.getType() === 'video') removeVideoTrack(track);
      if (track.getType() === 'audio') removeAudioTrack(track);
    },
    [removeAudioTrack, removeVideoTrack]
  );

  useEffect(() => {
    dispatch(engagementScoreChangeDetected(videoTracks));
  }, []);

  useEffect(() => {
    if (!conference) return;

    conference.on(JitsiMeetJS.events.conference.TRACK_ADDED, addTrack);
    conference.on(JitsiMeetJS.events.conference.TRACK_REMOVED, removeTrack);
    conference.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED,
      () => dispatch(engagementScoreChangeDetected(videoTracks)));
  }, [addTrack, conference, removeTrack, videoTracks, dispatch]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { conference, localVideoTrack } = await loadAndConnect({
      domain: 'meet.jit.si',
      room: 'some-default-room',
    });
    setConference(conference);
    addTrack(localVideoTrack);
  };

  const toggleMute = (trackType) => {
    const [localTrack] = conference.getLocalTracks().filter((track) => track.getType() === trackType);
    if (localTrack.isMuted()) {
      localTrack.unmute();
    } else {
      localTrack.mute();
    }
  };

  return (
    <div className="App">
      <h1>{message}</h1>
      {conference ? (
        <div>
          <div>
            {videoTracks.map((video) => (
              <Video key={video.getId()} track={video} />
            ))}
            {audioTracks.map((audio) => (
              <Audio key={audio.getId()} track={audio} />
            ))}
            <Sidebar />
          </div>
          <Controls toggleMute={toggleMute} />
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
