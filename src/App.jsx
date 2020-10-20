import "./App.css";
import regeneratorRuntime from "regenerator-runtime";
import React, { useEffect, useState, useCallback } from "react";
import jitsiConnect, {
  connectLocalTracksToAConference,
} from "../utils/jitsiConnector";
import { UIGridLayout } from "./uicontainers/";
import { Conference, Controls, Sidebar } from "./components";

/**
 * REACT application starts
 *
 * tracks state should be updated each time TRACK_ADDED is run,
 * and it should always reflect all the local and remote tracks in the conference
 */

const App = () => {
  console.log("Vinto: RENDERED or RE-RENDERED");
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
    console.log('Vinto: React app detects TRACK_ADDED');
    console.log('Vinto: the track that was added --->', track);
    console.log('Vinto: tracks at this time', tracks);
    console.log('Vinto: participant ID --->', track.getParticipantId());
    if((track.isLocal() && track.getType() === 'audio') || !track.getParticipantId()) return;

    const participantId = track.getParticipantId();
    const trackType = track.getType();
    const key = `${participantId}-${trackType}`;

    setTracks((tracks) => ({ ...tracks, [key]: track }));
  };

  const respondToTrackRemoved = (track) => {
    console.log("Vinto: React app detects TRACK_REMOVED");
    // newObj = {};
    // Object.entries(tracks)
    //   .filter(([key, value]) => (key !== track.getParticipantId()))
    //   .forEach(([key, value]) => {newObj[key] = value});
    // setTracks((tracks) => newObj);
  };

  const respondToUserLeft = (id, user) => {
    console.log(`Vinto: User ${id} Left`, user);
    setTracks((tracks) => {
      const updatedTracks = { ...tracks };
      const videoKey = `${id}-video`;
      const audioKey = `${id}-audio`;
      try {
        delete updatedTracks[videoKey];
        delete updatedTracks[audioKey];
        return updatedTracks;
      } catch (err) {
        console.log("Vinto: Failed to delete a track -->", err.message);
      }
    });
  };

  const connect = async (e) => {
    console.log("Vinto: Let's join a conference now");
    e.preventDefault();
    const { theConference, localVideoTrack } = await jitsiConnect({
      room: "some-default-room",
      trackAddedHandler: respondToTrackAdded,
      trackRemovedHandler: respondToTrackRemoved,
      userLeftHandler: respondToUserLeft,
    });
    const key = `${localVideoTrack.getParticipantId()}-${localVideoTrack.getType()}`;
    setConference(theConference);
    setTracks((tracks) => ({ ...tracks, [key]: localVideoTrack }));
  };

  /**
   * RENDER METHOD
   */
  let localTracks
  if (conference) {
    localTracks = conference.getLocalTracks();
  }
  return conference ? (
    <UIGridLayout>
      <Conference tracks={tracks} />
      <Sidebar />
      <Controls localTracks={localTracks} />
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
