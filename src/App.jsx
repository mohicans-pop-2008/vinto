import "./App.css";
import JitsiMeetJS from "lib-jitsi-meet";
import regeneratorRuntime from "regenerator-runtime";
import React, { useEffect, useState, useCallback } from "react";
import jitsiConnect, {
  connectLocalTracksToAConference,
} from "../utils/jitsiConnector";
import { UIGridLayout } from "./uicontainers/";
import { Conference, Controls, JoinForm, Sidebar } from "./components";

/**
 * REACT application starts
 *
 * tracks state should be updated each time TRACK_ADDED is run,
 * and it should always reflect all the local and remote tracks in the conference
 */

const App = () => {
  console.log("Vinto: RENDERED: app");
  const [name, setName] = useState("");
  const [id, setId] = useState(null);
  const [conference, setConference] = useState(null);
  const [tracks, setTracks] = useState({});
  const [participants, setParticipants] = useState({});

  /**
   * EVENT HANDLERS
   *
   * #connect - handles the onClick event of the connect button
   * #respondToTrackAdded - handles the TRACK_ADDED event, and expect
   *   to update the state.
   */

  const respondToTrackAdded = (track) => {
    console.log("Vinto: React app detects TRACK_ADDED");
    console.log("Vinto: the track that was added --->", track);
    console.log("Vinto: tracks at this time", tracks);
    console.log("Vinto: participant ID --->", track.getParticipantId());
    track.addEventListener(
      JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
      respondToTrackMuteChanged
    );
    if (
      (track.isLocal() && track.getType() === "audio") ||
      !track.getParticipantId()
    )
      return;

    const participantId = track.getParticipantId();
    const trackType = track.getType();
    const key = `${participantId}-${trackType}`;

    setParticipants((participants) => ({
      ...participants,
      [participantId]: true,
    }));
    setTracks((tracks) => ({ ...tracks, [key]: track }));
  };

  const respondToTrackRemoved = (track) => {
    console.log(
      `Vinto: A track has been removed, this is the track that's been removed: ${track}`
    );
  };

  const respondToUserLeft = (id, user) => {
    console.log(`Vinto: User ${id} Left`, user);

    setParticipants((participants) => {
      const updatedParticipants = { ...participants };
      try {
        delete updatedParticipants[id];
        return updatedParticipants;
      } catch (err) {
        console.log("Vinto: Failed to delete a participant -->", err.message);
      }
    });

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

  const respondToTrackMuteChanged = (track) => {
    console.log(
      "Vinto: React app detects TRACK_MUTE_CHANGED. Here is the track",
      track
    );
    console.log("Vinto: The new TrackID ---->", track.getId());
    if (track.getType() === "audio") return;
    if (track.isMuted()) {
      setTracks((tracks) => {
        const updatedTracks = { ...tracks };
        updatedTracks[`${track.getParticipantId()}-${track.getType()}`] = null;
        return updatedTracks;
      });
    } else {
      setTracks((tracks) => {
        const updatedTracks = { ...tracks };
        updatedTracks[`${track.getParticipantId()}-${track.getType()}`] = track;
        return updatedTracks;
      });
    }
  };

  /**
   * Joins a conference
   */
  const connect = async (e, name, room) => {
    console.log("Vinto: Let's join a conference now");
    e.preventDefault();
    const { theConference, localVideoTrack } = await jitsiConnect({
      room,
      trackAddedHandler: respondToTrackAdded,
      trackRemovedHandler: respondToTrackRemoved,
      trackMuteChangedHandler: respondToTrackMuteChanged,
      userLeftHandler: respondToUserLeft,
    });
    setConference(theConference);
    if (!localVideoTrack.getParticipantId()) return;
    setId(localVideoTrack.getParticipantId());
    const key = `${localVideoTrack.getParticipantId()}-${localVideoTrack.getType()}`;
    console.log("Vinto: key ========>", key);
    setTracks((tracks) => ({ ...tracks, [key]: localVideoTrack }));
    setName(name);
  };

  /**
   * RENDER METHOD
   */
  let localTracks;
  if (conference) {
    localTracks = conference.getLocalTracks();
  }
  let participantCount = null;
  if (Object.keys(participants).length) {
    participantCount = Object.keys(participants).length;
  }
  return conference ? (
    <UIGridLayout>
      <Conference tracks={tracks} participantCount={participantCount || 0} />
      <Sidebar />
      <Controls localTracks={localTracks} />
      <button
        onClick={async () => {
          Object.keys(tracks)
            .filter((key) => key.includes(id))
            .map((key) => tracks[key])
            .forEach(async (track) => await track.dispose());
          await conference.leave();
          setConference(null);
          setTracks({});
          setName("");
          setId(null);
        }}
      >
        Leave Conference
      </button>
    </UIGridLayout>
  ) : (
    <JoinForm onSubmit={connect} />
  );
};

export default App;
