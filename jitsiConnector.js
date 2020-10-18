import JitsiMeetJS from 'lib-jitsi-meet';
import config from '../utils/jitsi.config';


const joinMeeting = ({ room }) => {
  JitsiMeetJS.init();
  config.serviceUrl = config.websocket || config.bosh
  config.serviceUrl += `?room=${room}`
  const connection = new JitsiMeetJS.JitsiConnection(null, null, config);
  connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, () => onConnectionSuccess(connection, room));
  connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, () => console.log('Connection failed'));
  connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, () => console.log('Connection disconnected'));
  connection.connect();
}

export default joinMeeting
