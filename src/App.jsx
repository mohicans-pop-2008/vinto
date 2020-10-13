/* global JitsiMeetJS config */
import './App.css';
import { hot } from 'react-hot-loader';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import JitsiMeetJS from 'lib-jitsi-meet';
import $ from 'jquery';
import config from '../utils/jitsi.config';
import { engagementScoreChangeDetected } from './store';
import {
  Video, Audio, Controls, Sidebar,
} from './components';

window.$ = $;

const loadAndConnect = ({ room }) => new Promise(async (resolve) => {
  JitsiMeetJS.init();
  config.serviceUrl = config.websocket || config.bosh;
  config.serviceUrl += `?room=${room}`;
  const connection = new JitsiMeetJS.JitsiConnection(null, undefined, config);
  await connection.connect();
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
});

// JITSI STANDUP CUSTOM HOOK
const useTracks = () => {
  console.log('==========> useTracks was called <==========');
  const [tracks, setTracks] = useState([]);

  const addTrack = useCallback(
    (track) => {
      setTracks((tracks) => {
        const hasTrack = tracks.find(
          (_track) => track.getId() === _track.getId(),
        );

        if (hasTrack) return tracks;

        return [...tracks, track];
      });
    },
    [setTracks],
  );

  const removeTrack = useCallback(
    (track) => {
      setTracks((tracks) => tracks.filter((_track) => track.getId() !== _track.getId()));
    },
    [setTracks],
  );

  const updateTrack = useCallback((updatedTrack) => {
    console.log('==========> Updated Track Here <==========');
    console.log(updatedTrack);
    console.dir(updatedTrack);
    setTracks((tracks) => tracks.map((_track) => {
      if (updatedTrack.getId() === _track.getId()) return updatedTrack;
      return _track;
    }));
  });
  return [tracks, addTrack, removeTrack, updateTrack];
};

const useMuteEvents = (videoTracks, dispatch) => {
  console.log('=====> useMuteEvents <=====');
  let isMutedArr = videoTracks.map((track) => track.isMuted());
  console.log('isMutedArr before useTracks ===>', isMutedArr);
  // [videoTracks, addVideoTrack, removeVideoTrack] = useTracks();
  isMutedArr = videoTracks.map((track) => track.isMuted());
  console.log('isMutedArr after useTracks ===>', isMutedArr);
  dispatch(engagementScoreChangeDetected(videoTracks));
};

const message = 'Welcome to vinto';

const App = () => {
  const [conference, setConference] = useState(null);
  const [
    videoTracks,
    addVideoTrack,
    removeVideoTrack,
    updateVideoTrack,
  ] = useTracks();
  const [
    audioTracks,
    addAudioTrack,
    removeAudioTrack,
    unusedUpdateFunc,
  ] = useTracks();
  const dispatch = useDispatch();

  const addTrack = useCallback(
    (track) => {
      if (track.getType() === 'video') addVideoTrack(track);
      if (track.getType() === 'audio' && track.isLocal() === false) addAudioTrack(track);
    },
    [addVideoTrack, addAudioTrack],
  );

  const removeTrack = useCallback(
    (track) => {
      if (track.getType() === 'video') removeVideoTrack(track);
      if (track.getType() === 'audio') removeAudioTrack(track);
    },
    [removeAudioTrack, removeVideoTrack],
  );

  const updateTrack = useCallback((track) => {
    if (track.getType() === 'video') updateVideoTrack(track);
  });

  useEffect(() => {
    if (!conference) return;

    conference.on(JitsiMeetJS.events.conference.TRACK_ADDED, addTrack);
    conference.on(JitsiMeetJS.events.conference.TRACK_REMOVED, removeTrack);
    conference.on(
      JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED,
      updateTrack,
      () => dispatch(engagementScoreChangeDetected(videoTracks)),
    );
  }, [addTrack, conference, removeTrack, videoTracks]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { conference, localVideoTrack } = await loadAndConnect({
      room: 'some-default-room',
    });
    setConference(conference);
    addTrack(localVideoTrack);
  };

  const toggleMute = (trackType) => {
    const [localTrack] = conference
      .getLocalTracks()
      .filter((track) => track.getType() === trackType);
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
