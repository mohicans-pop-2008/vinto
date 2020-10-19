import React, { useEffect, useState, useCallback } from "react";
import regeneratorRuntime from "regenerator-runtime";
import jitsiConnect, {
  connectLocalTracksToAConference,
  getRemoteVideoTracks,
  TRACK_ADDED,
} from "../utils/jitsiConnector";
import { Video } from "./components"

/**
 * Random Number Generator
 *
 * You get a number and you get a number!
 */

const createRandomNum = () => Math.floor(Math.random() * 10000);

/**
 * REACT application starts
 *
 * tracks state should be updated each time TRACK_ADDED is run,
 * and it should always reflect all the local and remote tracks in the conference
 */

const App = () => {
  console.log("RENDERED or RE-RENDERED");
  const [conference, setConference] = useState(null);
  const [tracks, setTracks] = useState({});

  /**
   * EVENT HANDLERS
   *
   * #connect - handles the onClick event of the connect button
   * #respondToTrackAdded - handles the TRACK_ADDED event, and expect
   *   to update the state.
   */

  const respondToTrackAdded = (track) => {
    console.log("React app detects TRACK_ADDED");
    console.log("the track that was added --->", tracks);
    console.log("tracks at this time", tracks);
    console.log("participant ID --->", track.getParticipantId());

    const participantId = track.getParticipantId();
    const trackType = track.getType();
    const key = `${participantId}-${trackType}`;

    // If we are joining an existing meeting, we want to check for other
    // tracks.
    if (track.isLocal()) {
      // setTracks((tracks) => [...tracks, track]);
      setTracks((tracks) => ({ ...tracks, [key]: track }));
      return;
    }

    // setTracks((tracks) => [...tracks, track]);
    setTracks((tracks) => ({ ...tracks, [key]: track }));
  };

  const connect = async (e) => {
    console.log("Let's join a conference now");
    e.preventDefault();
    const { theConference } = await jitsiConnect({
      room: "some-default-room",
      trackAddedHandler: respondToTrackAdded,
    });
    const localVideoTrack = await connectLocalTracksToAConference({
      conference: theConference,
    });
    setConference(theConference);
    // setTracks(tracks => [...tracks, localVideoTrack]);
  };

  // const respondToTrackRemoved = (e) => {
  //   console.log("target --->", e.target);
  //   console.log("React app detects TRACK_REMOVED");
  //   console.log("tracks before", tracks);
  //   const randomIndex = Math.floor(Math.random() * tracks.length);
  // };

  /**
   * RENDER METHOD
   */

  return (
    <div>
      {createRandomNum()}
      <button type="submit" onClick={connect}>
        Join a Conference
      </button>
      {tracks ? (
        Object.keys(tracks)
          .filter((trackKey) => trackKey.includes("video"))
          .map((vTrackKey) => {
            const videoTrack = tracks[vTrackKey];
            return <Video track={videoTrack} />
          })
      ) : (
        <h3>No tracks</h3>
      )}
    </div>
  );
};

export default App;
