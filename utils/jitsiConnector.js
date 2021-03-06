import JitsiMeetJS from "lib-jitsi-meet";
import $ from "jquery";
import config from "./jitsi.config";

window.$ = $; // JitsiMeetJS needs jQuery selector to work

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
  const connection = new JitsiMeetJS.JitsiConnection(null, undefined, config);

  // attempt a connection
  return new Promise((resolve) => {
    // registers event listeners onto a connection
    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      () => resolve(connection)
    );
    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_FAILED,
      () => console.log("Vinto: Connection failed")
    );
    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
      () => console.log("Vinto: Connection disconnected")
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
  trackMuteChangedHandler,
  userLeftHandler,
}) => {
  // create the local representation of the conference
  const conference = connection.initJitsiConference(room, {});
  return new Promise(async (resolve) => {
    const localTracks = await JitsiMeetJS.createLocalTracks(
      { devices: ["video", "audio"], facingMode: "user" },
      true
    );
    localTracks.forEach((track) => {
      if(track.getType() === 'audio') {
        track.mute();
      };
      track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, trackMuteChangedHandler)
    })
    console.log(
      "Vinto: The length of localTracks is 2",
      localTracks.length === 2
    );
    const [localVideoTrack] = localTracks.filter(
      (track) => track.getType() === "video"
    );
    const [localAudioTrack] = localTracks.filter(
      (track) => track.getType() === "audio"
    );
    conference.on(JitsiMeetJS.events.conference.TRACK_ADDED, trackAddedHandler);
    conference.on(
      JitsiMeetJS.events.conference.TRACK_REMOVED,
      trackRemovedHandler
    );
    conference.on(JitsiMeetJS.events.conference.USER_LEFT, userLeftHandler);
    // register event handler for successful joining of the conference
    conference.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
      resolve({ conference, localVideoTrack, localAudioTrack });
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
  console.log(
    "Vinto: The length of localTracks is 1",
    localTracks.length === 1
  );
  localTracks.forEach((track) => {

    conference.addTrack(track);
  });
  const [localVideoTrack] = localTracks.filter(
    (track) => track.getType() === "video"
  );
  return localVideoTrack;
};

/**
 * #connect
 *
 * - FINAL step
 * - awaits initialization and connection
 * - awaits conference and joining
 * - returns the conference and track for use by React app
 */
const jitsiConnect = async ({
  room,
  trackAddedHandler,
  trackRemovedHandler,
  trackMuteChangedHandler,
  userLeftHandler,
}) => {
  const connection = await connectToAServer({ room });
  console.log("Vinto: Connection object", connection);
  const { conference, localVideoTrack, localAudioTrack } = await connectToAConference({
    room,
    connection,
    trackAddedHandler,
    trackRemovedHandler,
    trackMuteChangedHandler,
    userLeftHandler,
  });
  conference.addTrack(localVideoTrack);
  conference.addTrack(localAudioTrack)
  console.log("Vinto: Conference object", conference);
  return { theConference: conference, localVideoTrack };
};

export default jitsiConnect;

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
  console.log("Vinto: Are participants undefined?", participants);
  const remoteVideoTracks = participants.map((participant) => {
    if (participant._tracks.length) {
      console.log("Vinto: _tracks has stuff in it <==");
    } else {
      console.log("Vinto: _tracks is empty <==");
    }
    const [theVideoTrack] = participant._tracks.filter(
      (track) => track.getType() === "video"
    );
    return theVideoTrack;
  });
  console.log("Vinto: Is remoteVideoTracks undefined?", remoteVideoTracks);
  return remoteVideoTracks;
};
