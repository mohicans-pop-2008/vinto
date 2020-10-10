import './App.css';
import { hot } from 'react-hot-loader';
import React from 'react';
import $ from 'jquery';
import { Video } from './components';

window.$ = $;

const loadAndConnect = ({domain, room}) => {
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
          resolve({conference, localVideoTrack})
        })
        await connection.connect()
      }
    };
  })
};

const message = 'Welcome to vinto';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentConference: null,
      videos: [],
      audios: [],
    };
    this.onSubmit.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    const { conference, localVideoTrack } = await loadAndConnect({
      domain: 'meet.jit.si',
      room: 'some-default-room',
    });
    this.setState({
      currentConference: conference,
      videos: [...this.state.videos, localVideoTrack],
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{message}</h1>
        {/* this is what i expect to see when I am not connected to a conference */}
        <form onSubmit={(e) => this.onSubmit(e)}>
          <button type="submit">Connect to this Conference!</button>
        </form>
        {/* What I want to see upon connection */}
      </div>
    );
  }
}
// const App = () => {
//   const [currentConf, setConference] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [audios, setAudios] = useState([]);

//   loadAndConnect({ domain: 'meet.jit.si', room: 'some-default-room' });
//   // setConference(conference);
//   // const [videoTracks, addVideoTrack, removeVideoTrack] = useTracks();
//   // const [audioTracks, addAudioTrack, removeAudioTrack] = useTracks();

//   // const addTrack = useCallback((track) => {
//   //   if (track.getType() === 'video') addVideoTrack(track);
//   //   if (track.getType() === 'audio') addAudioTrack(track);
//   // }, [addVideoTrack, addAudioTrack]);

//   // const removeTrack = useCallback((track) => {
//   //   if (track.getType() === 'video') removeVideoTrack(track);
//   //   if (track.getType() === 'audio') removeAudioTrack(track);
//   // }, [removeAudioTrack, removeVideoTrack]);

//   return (
//     <div className="App">
//       <h1>{message}</h1>
//       {videos.length ? <Video track={videos[0]} /> : <div>No video</div>}
//     </div>
//   );
// };

// const connectionFailed = () => {
//   console.log('=============> CONNECTION FAILED <=============');
// };

// async function connectionSuccessful(room) {
//   return { conference, localVideoTrack };
// }

export default hot(module)(App);
