import JitsiMeetJS from "lib-jitsi-meet";
import $ from "jquery";
import config from "./jitsi.config";

window.$ = $; // JitsiMeetJS needs this to work

export const TRACK_ADDED = JitsiMeetJS.events.conference.TRACK_ADDED;

/**
 * connectToAServer
 * - step 1: connects to a Jitsi Meet server
 * - specify a room name
 * - initialize JitsiMeetJS
 * - called by #connect - the default export of this file
 */
const connectToAServer = ({ room }) => {
  // initialize
  JitsiMeetJS.init();

  // set log level
  JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.TRACE);

  // connect to a server
  let serviceUrl = config.websocket || config.bosh;
  serviceUrl += `?room=${room}`;
  config.serviceUrl = config.bosh = serviceUrl;
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
 * connectToAConference
 *
 * - step 2: initializes and joins the conference
 * - intended for running only after CONNECTION_ESTABLISHED
 * - returns {Promise} that resolves to the conference object
 *   when CONFERENCE_JOINED fires
 */
const connectToAConference = ({
  room,
  connection,
  trackAddedHandler,
  trackRemovedHandler,
}) => {
  // create the local representation of the conference
  const conference = connection.initJitsiConference(room, {});
  return new Promise((resolve) => {
    conference.on(JitsiMeetJS.events.conference.TRACK_ADDED, trackAddedHandler);
    conference.on(
      JitsiMeetJS.events.conference.TRACK_REMOVED,
      trackRemovedHandler
    );
    // register event handler for successful joining of the conference
    conference.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
      resolve(conference);
    });
    // join the conference
    conference.join();
  });
};

/**
 * #connectLocalTracksToAConference
 * step 3: create local tracks and adds them to conference
 * returns only our localVideoTrack - because who wants to hear themselves speak?
 */
export const connectLocalTracksToAConference = async ({ conference }) => {
  const localTracks = await JitsiMeetJS.createLocalTracks(
    { devices: ["video"], facingMode: "user" },
    true
  );
  console.log("The length of localTracks is 1", localTracks.length === 1);
  localTracks.forEach((track) => {
    conference.addTrack(track);
  });
  const [localVideoTrack] = localTracks.filter(
    (track) => track.getType() === "video"
  );
  return localVideoTrack;
};

/**
 * #getRemoteVideoTracks
 *
 * NOTE: unpredictable behavior, sometimes tracks are there, other times
 * no
 *
 * loads all the other participant tracks from the Jitsi Meet server
 * returns an array of videoTracks corresponding to all participants
 * in conference prior to the time of this client joining.
 */
export const getRemoteVideoTracks = ({ conference }) => {
  const participants = conference.getParticipants();
  console.log("Are participants undefined?", participants);
  const remoteVideoTracks = participants.map((participant) => {
    if (participant._tracks.length) {
      console.log("_tracks has stuff in it <==");
    } else {
      console.log("_tracks is empty <==");
    }
    const [theVideoTrack] = participant._tracks.filter(
      (track) => track.getType() === "video"
    );
    return theVideoTrack;
  });
  console.log("Is remoteVideoTracks undefined?", remoteVideoTracks);
  return remoteVideoTracks;
};

/**
 * #connect
 *
 * - awaits initialization and connection
 * - awaits conference and joining
 * - returns the conference and track for use by React app
 */
const jitsiConnect = async ({
  room,
  trackAddedHandler,
  trackRemovedHandler,
}) => {
  const connection = await connectToAServer({ room });
  console.log("Connection object", connection);
  const conference = await connectToAConference({
    room,
    connection,
    trackAddedHandler,
    trackRemovedHandler,
  });
  console.log("Conference object", conference);
  return { theConference: conference };
};

export default jitsiConnect;
