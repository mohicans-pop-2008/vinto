import './App.css';
import { hot } from 'react-hot-loader';
import React from 'react';
import $ from 'jquery';
import { Video } from './components';

window.$ = $;

async function connectionSuccessful(room) {
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

const connect = () => {
  JitsiMeetJS.init();
  const configScript = document.createElement('script');
  configScript.src = `https://${domain}/config.js`;
  document.querySelector('head').appendChild(configScript);
  configScript.onload = async () => {
    config.serviceUrl = config.websocket || config.bosh;
    config.serviceUrl += `?room=${room}`;
    const connection = new JitsiMeetJS.JitsiConnection(null, undefined, config);
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      connectionSuccessful.bind(connection, room));
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED,
      connectionFailed);
    await connection.connect();
  };
};

const helper = () => {
  script.onload = connect;
};

let conference;
let localVideoTrack;
const loadAndConnect = async ({ domain, room }) => {
  const script = document.createElement('script');
  script.src = `https://${domain}/libs/lib-jitsi-meet.min.js`;
  document.querySelector('head').appendChild(script);

  // script.onload = () => {
  //   JitsiMeetJS.init();
  //   const configScript = document.createElement('script');
  //   configScript.src = `https://${domain}/config.js`;
  //   document.querySelector('head').appendChild(configScript);
  //   configScript.onload = async () => {
  //     config.serviceUrl = config.websocket || config.bosh;
  //     config.serviceUrl += `?room=${room}`;
  //     const connection = new JitsiMeetJS.JitsiConnection(null, undefined, config);
  //     connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
  //       connectionSuccessful.bind(connection, room));
  //     connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED,
  //       connectionFailed);
  //     await connection.connect();
  //   };
  // };
  return { conference, localVideoTrack };
};

const message = 'Welcome to vinto';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentConference: null,
      videos: [],
      audios: []
    };
    this.onSubmit.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    const { conference, localVideoTrack } = await loadAndConnect({ domain: 'meet.jit.si', room: 'some-default-room' });
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

export default hot(module)(App);
