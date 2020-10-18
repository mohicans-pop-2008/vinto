import JitsiMeetJS from "lib-jitsi-meet";
import config from "./jitsi.config";

/**
 * EVENT Handlers
 */

const onConnectionSuccess = (room, connection) => {
  console.log("room", room);
  console.log("connection", connection);
  console.log("Connection Established");

  // create the local representation of the conference
  const conference = createLocalConferenceRepresentation({ room, connection });

  // join the conference
  conference.join();
};

/**
 * initalize JitsiMeetJS
 */

/**
 * connect to Jitsi Meet server
 * - specify a room name
 */

const connectToAServer = ({ room }) => {
  // initialize
  JitsiMeetJS.init();

  // set log level
  JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.DEBUG);

  // connect to a server
  config.serviceUrl = config.websocket || config.bosh;
  config.serviceUrl += `?room=${room}`;
  const connection = new JitsiMeetJS.JitsiConnection(null, null, config);

  // registers event listeners onto a connection
  connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
    () => onConnectionSuccess(room, connection)
  );
  connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_FAILED,
    () => console.log("Connection failed")
  );
  connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
    () => console.log("Connection disconnected")
  );

  // attempt a connection
  connection.connect();
};

/**
 * create OR join a conference
 * - if the conference already exists with a given room name
 *   expect to join and see other people
 */

const createLocalConferenceRepresentation = ({ room, connection }) => {
  const conference = connection.initJitsiConference(room, {});
  return conference;
};

/**
 * set up tracks
 */

/**
 * return the conference and track for use by React app
 */

export default connectToAConference;
