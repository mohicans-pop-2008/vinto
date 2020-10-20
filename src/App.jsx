import "./App.css";
import regeneratorRuntime from "regenerator-runtime";
import React, { useEffect, useState, useCallback } from "react";
import jitsiConnect, {
  connectLocalTracksToAConference,
} from "../utils/jitsiConnector";
import { UIGridLayout } from "./uicontainers/";
import { Conference } from "./components";

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

    setTracks((tracks) => ({ ...tracks, [key]: track }));
  };

  const respondToTrackRemoved = (track) => {
    console.log("React app detects TRACK_REMOVED");
    // newObj = {};
    // Object.entries(tracks)
    //   .filter(([key, value]) => (key !== track.getParticipantId()))
    //   .forEach(([key, value]) => {newObj[key] = value});
    // setTracks((tracks) => newObj);
  };

  const connect = async (e) => {
    console.log("Let's join a conference now");
    e.preventDefault();
    const { theConference } = await jitsiConnect({
      room: "some-default-room",
      trackAddedHandler: respondToTrackAdded,
      trackRemovedHandler: respondToTrackRemoved,
    });
    const localVideoTrack = await connectLocalTracksToAConference({
      conference: theConference,
    });
    setConference(theConference);
  };

  /**
   * RENDER METHOD
   */

  return conference ? (
    <UIGridLayout>
      <Conference tracks={tracks} />
    </UIGridLayout>
  ) : (
    <div>
      <button type="submit" onClick={connect}>
        Join a Conference
      </button>
    </div>
  );
};

export default App;
