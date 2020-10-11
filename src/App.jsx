import './App.css';
import { hot } from 'react-hot-loader';
import React, { useEffect, useState, useCallback } from 'react';
import $ from 'jquery';
import { Video } from './components';

window.$ = $;

const loadAndConnect = ({ domain, room }) => {
  return new Promise((resolve) => {
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
        connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, async () => {
          console.log('=============> CONNECTION ESTABLISHED <=============');
          const conference = connection.initJitsiConference(room, {})
          await conference.join()
          console.log('=============> CONFERENCE JOINED <=============');
          const localTracks = await JitsiMeetJS.createLocalTracks(
            { devices: ['video', 'audio'], facingMode: 'user' },
            true,
          );
          console.log('=============> Video & Audio Tracks Created <=============');
          const localVideoTrack = localTracks.find((track) => track.getType() === 'video');
          const localAudioTrack = localTracks.find(
            (track) => track.getType() === 'audio',
          );
          conference.addTrack(localVideoTrack);
          conference.addTrack(localAudioTrack);
          console.log('=============> Video & Audio Tracks Connected <=============');
          resolve({ conference, localVideoTrack })
        })
        await connection.connect()
      }
    };
  })
};

// JITSI STANDUP CUSTOM HOOK
const useTracks = () => {
  const [tracks, setTracks] = useState([])

  const addTrack = useCallback((track) => {
    setTracks((tracks) => {
      const hasTrack = tracks.find(_track => track.getId() === _track.getId())

      if (hasTrack) return tracks;

      return [...tracks, track]

    });
  }, [setTracks])

  const removeTrack = useCallback((track) => {
    setTracks((tracks) => tracks.filter(_track => track.getId() !== _track.getId()))
  }, [setTracks])

  return [tracks, addTrack, removeTrack]
}

const message = 'Welcome to vinto';

const App = () => {
  const [conference, setConference] = useState(null);
  // const [videos, setVideos] = useState([]);
  // const [audios, setAudios] = useState([]);

  const [videoTracks, addVideoTrack, removeVideoTrack] = useTracks();
  const [audioTracks, addAudioTrack, removeAudioTrack] = useTracks();

  const addTrack = useCallback((track) => {
    if (track.getType() === 'video') addVideoTrack(track)
    if (track.getType() === 'audio') addAudioTrack(track)
  }, [addVideoTrack, addAudioTrack])

  const removeTrack = useCallback((track) => {
    if (track.getType() === 'video') removeVideoTrack(track)
    if (track.getType() === 'audio') removeAudioTrack(track)
  }, [removeAudioTrack, removeVideoTrack])

  // MINE
  // Add tracks
  // const addVideo = useCallback((video) => {
  //   setVideos([...videos, video]);
  // }, [videos, setVideos]);

  // const addAudio = useCallback((audio) => {
  //   setAudios([...audios, audio]);
  // }, [audios, setAudios]);

  // const addTrack = useCallback((track) => {
  //   if (track.getType() === 'video') addVideo(track);
  //   if (track.getType() === 'audio') addAudio(track);
  // }, [addVideo, addAudio]);

  // Remove tracks
  // const removeVideo = useCallback((video) => {
  //   setVideos(videos.filter((track) => track.getId() !== video.getId()));
  // }, [videos, setVideos]);

  // const removeAudio = useCallback((audio) => {
  //   setAudios(audios.filter((track) => track.getId() !== audio.getId()));
  // }, [audios, setAudios]);

  // const removeTrack = useCallback((track) => {
  //   if (track.getType() === 'video') removeVideo(track);
  //   if (track.getType() === 'audio') removeAudio(track);
  // }, [removeVideo, removeAudio]);

  useEffect(() => {
    if (!conference) return;

    conference.on(JitsiMeetJS.events.conference.TRACK_ADDED, addTrack);
    conference.on(JitsiMeetJS.events.conference.TRACK_REMOVED, removeTrack);
  }, [addTrack, conference, removeTrack]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { conference, localVideoTrack } = await loadAndConnect({
      domain: 'meet.jit.si',
      room: 'some-default-room',
    });
    setConference(conference);
    addTrack(localVideoTrack);
  };

  return (
    <div className="App">
      <h1>{message}</h1>
      {videoTracks.length
        ? (<div>
          {videoTracks.map((video) => <Video key={video.getId()} track={video} />)}
          {audioTracks.map((audio) => <Audio key={audio.getId()} track={audio} />)}
        </div>)
        : <form onSubmit={(e) => onSubmit(e)}>
          <button type="submit">Connect to this Conference!</button>
        </form>}
    </div>
  );
};

export default hot(module)(App);
