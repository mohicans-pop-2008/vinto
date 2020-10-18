import JitsiMeetJS from "lib-jitsi-meet";
import $ from "jquery";
import config from "./jitsi.config";

window.$ = $;
/**
 * EVENT Handlers
 */

let conferenceObject;

/**
 * UNUSED AND DEPRECATED onConnectionSuccess
 *
 * meant to run when CONNECTION_ESTABLISHED event fires
 */
const onConnectionSuccess = (room, connection) => {
  console.log("room", room);
  console.log("connection", connection);
  console.log("Connection Established");

  // create the local representation of the conference
  const conference = connection.initJitsiConference(room, {});
  conference.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
    conferenceObject = conference;
  });

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

const connectToAServer = async ({ room }) => {
  // initialize
  JitsiMeetJS.init();

  // set log level
  JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.DEBUG);

  // connect to a server
  config.serviceUrl = config.websocket || config.bosh;
  config.serviceUrl += `?room=${room}`;
  const connection = new JitsiMeetJS.JitsiConnection(null, null, config);

  // attempt a connection
  return new Promise((resolve) => {
    // registers event listeners onto a connection
    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      () => resolve(connection)
    );
    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_FAILED,
      () => console.log("Connection failed")
    );
    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
      () => console.log("Connection disconnected")
    );
    connection.connect();
  });
};

/**
 * create OR join a conference
 * - if the conference already exists with a given room name
 *   expect to join and see other people
 */

/**
 * set up tracks
 */

/**
 * return the conference and track for use by React app
 */
const connect = async ({room}) => {
  const connection = await connectToAServer({room})
  console.log("Connection object", connection)
  return new Promise((resolve, reject) => {
    let theConference;
    let localTrack;

    // call resolve on an object that includes
    // theConference and localTrack
    if (theConference && localTrack) {
      console.log("Gettin there!")
      resolve({ theConference, localTrack });
    } else {
      console.log("Something went horribly wrong")
      reject(new Error("theConference is falsy"));
    }
  });
};

export default connect;
