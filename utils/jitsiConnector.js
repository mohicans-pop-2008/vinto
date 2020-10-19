import JitsiMeetJS from "lib-jitsi-meet";
import $ from "jquery";
import config from "./jitsi.config";

window.$ = $;
/**
 * EVENT Handlers
 */

/**
 * meant to run when CONNECTION_ESTABLISHED event fires
 */
const connectToAConference = ({ room, connection }) => {
  // create the local representation of the conference
  const conference = connection.initJitsiConference(room, {});
  return new Promise((resolve) => {
    // register event handler for successful joining of the conference
    conference.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
      resolve(conference);
    });
    // join the conference
    conference.join();
  });
};

/**
 * creates local tracks and adds them to conference
 *
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
 * grabs all the other participant tracks from the Meet server
 *
 * returns an array of videoTracks corresponding to all participants
 * in conference prior to the time of this client joining.
 */
export const getRemoteVideoTracks = ({ conference }) => {
  const participants = conference.getParticipants();
  console.log("Are participants undefined?", participants)
  const remoteVideoTracks = participants.map((participant) => {
    if (participant._tracks.length) {
      console.log("_tracks has stuff in it <==")
    } else {
      console.log("_tracks is empty <==")
    }
    const [theVideoTrack] = participant
      ._tracks
      .filter((track) => track.getType() === "video");
    return theVideoTrack;
  });
  console.log("Is remoteVideoTracks undefined?", remoteVideoTracks)
  return remoteVideoTracks;
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
  JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);

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
const connect = async ({ room }) => {
  const connection = await connectToAServer({ room });
  console.log("Connection object", connection);
  const conference = await connectToAConference({ room, connection });
  console.log("Conference object", conference);
  return { theConference: conference };
  // return new Promise((resolve, reject) => {
  //   let theConference;
  //   let localTrack;

  //   // call resolve on an object that includes
  //   // theConference and localTrack
  //   if (theConference) {
  //     console.log("Gettin there!")
  //     resolve({ theConference, localTrack });
  //   } else {
  //     console.log("Something went horribly wrong")
  //     reject(new Error("theConference is falsy"));
  //   }
  // });
};

export default connect;
