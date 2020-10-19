import React, { useEffect, useState, useCallback } from "react";
import regeneratorRuntime from "regenerator-runtime";
import connect, {
  connectLocalTracksToAConference,
  getRemoteVideoTracks,
  TRACK_ADDED,
} from "../utils/jitsiConnector";

/**
 * Random Number Generator
 *
 * You get a number and you get a number!
 */

const createRandomNum = () => Math.floor(Math.random() * 10000);

/**
 * MOCK Jitsi Connection Functionality
 *
 * Called by our React application when someone tries to join
 * the conference by clicking the join conference button.
 */

const connectToAConference = connect
  ? connect
  : ({ room }) => {
      const conference = {
        room: "abc",
        on: function (eventType, fn) {
          console.log("Registering event listener");
          const elem = document.getElementById("root");
          elem.addEventListener(eventType, fn);
        },
        removeEventListener: function (eventType, fn) {
          console.log("Removing an old event listener");
          const elem = document.getElementById("root");
          elem.removeEventListener(eventType, fn);
        },
      };
      const localTrack = { type: "video" };
      return {
        conference,
        localTrack,
      };
    };

/**
 * MOCK Jitsi Meet Server
 *
 * Emits a TRACK_ADDED event 5 times (to mimic 5 people joining)
 */

// function mimicAddTrack() {
//   console.log("MIMIC ADD TRACK FIRED");
//   const trackAdded = new Event("TRACK_ADDED");
//   const root = document.getElementById("root");
//   root.dispatchEvent(trackAdded);
// }

// function mimicRemoveTrack() {
//   console.log("MIMIC REMOVE TRACK FIRED");
//   const trackRemoved = new Event("TRACK_REMOVED");
//   const root = document.getElementById("root");
//   root.dispatchEvent(trackRemoved);
// }

// (async () => {
//   let x = 10;
//   while (x > 0) {
//     if (x < 6) {
//       window.setTimeout(mimicAddTrack, x * 2000);
//       x--;
//     } else {
//       window.setTimeout(mimicRemoveTrack, x * 2000);
//       x--;
//     }
//   }
// })();

/**
 * REACT application starts
 *
 * tracks state should be updated each time TRACK_ADDED is run,
 * and it should always reflect all the local and remote tracks in the conference
 */

const App = () => {
  console.log("RENDERED or RE-RENDERED");
  const [conference, setConference] = useState(null);
  const [tracks, setTracks] = useState([]);

  /**
   * EVENT HANDLERS
   *
   * #connect - handles the onClick event of the connect button
   * #respondToTrackAdded - handles the TRACK_ADDED event, and expect
   *   to update the state.
   */

  const connect = async (e) => {
    console.log("Let's join a conference now");
    e.preventDefault();
    const { theConference } = await connectToAConference({
      room: "some-default-room",
    });
    const localVideoTrack = await connectLocalTracksToAConference({
      conference: theConference,
    });
    setConference(theConference);
    // setTracks(tracks => [...tracks, localVideoTrack]);
  };

  const respondToTrackAdded = (track) => {
    console.log("React app detects TRACK_ADDED");
    console.log("the track that was added --->", track);
    console.log("tracks at this time", tracks);

    // If we are joining an existing meeting, we want to check for other
    // tracks.
    if (track.isLocal()) {
      setTracks((tracks) => [...tracks, track]);
      return;
    }

    // if (track.getType() === "audio") {
    //   return;
    // }

    setTracks((tracks) => [...tracks, track]);
  };

  const respondToTrackRemoved = (e) => {
    console.log("target --->", e.target);
    console.log("React app detects TRACK_REMOVED");
    console.log("tracks before", tracks);
    const randomIndex = Math.floor(Math.random() * tracks.length);
    // const newTracksArray = tracks.filter((element, index) => {
    //   return index !== randomIndex;
    // });
    // console.log("tracks after", newTracksArray);
    // setTracks(newTracksArray);
  };

  /**
   * REACT EFFECT HOOKS
   *
   * These detect changes in state and perform necessary actions
   * in response.
   */

  useEffect(() => {
    if (!conference) return;
    console.log("Adding TRACK_ADDED event listener to the conference");
    conference.on(TRACK_ADDED, respondToTrackAdded);
    conference.on("TRACK_REMOVED", respondToTrackRemoved);
    return () => {
      console.log("Removing TRACK_ADDED listener from conference");
      conference.removeEventListener(TRACK_ADDED, respondToTrackAdded);
      conference.removeEventListener("TRACK_REMOVED", respondToTrackRemoved);
    };
  }, [tracks, conference]);

  /**
   * RENDER METHOD
   */

  return (
    <div>
      {createRandomNum()}
      <button type="submit" onClick={connect}>
        Join a Conference
      </button>
      {/* {conference && conference.room}
      {tracks && tracks.type} */}
      {/* {tracks ? Object.keys(tracks).map(track => {
        <video id={track.id} width='250' type='video' src=''>

      </video>
      }):<h3>no tracks found</h3>} */}
      <video width="250" type="video" src=""></video>
    </div>
  );
};

export default App;
