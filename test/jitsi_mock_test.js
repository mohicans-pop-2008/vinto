

/**
 * MOCK Jitsi Connection Functionality
 *
 * Called by our React application when someone tries to join
 * the conference by clicking the join conference button.
 */

// const connectToAConference = connect
//   ? connect
//   : ({ room }) => {
//       const conference = {
//         room: "abc",
//         on: function (eventType, fn) {
//           console.log("Registering event listener");
//           const elem = document.getElementById("root");
//           elem.addEventListener(eventType, fn);
//         },
//         removeEventListener: function (eventType, fn) {
//           console.log("Removing an old event listener");
//           const elem = document.getElementById("root");
//           elem.removeEventListener(eventType, fn);
//         },
//       };
//       const localTrack = { type: "video" };
//       return {
//         conference,
//         localTrack,
//       };
//     };

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
   * REACT EFFECT HOOKS
   *
   * These detect changes in state and perform necessary actions
   * in response.
   */

  // useEffect(() => {
  //   if (!conference) return;
  //   console.log("Adding TRACK_ADDED event listener to the conference");
  //   conference.on(TRACK_ADDED, respondToTrackAdded);
  //   conference.on("TRACK_REMOVED", respondToTrackRemoved);
  //   return () => {
  //     console.log("Removing TRACK_ADDED listener from conference");
  //     conference.removeEventListener(TRACK_ADDED, respondToTrackAdded);
  //     conference.removeEventListener("TRACK_REMOVED", respondToTrackRemoved);
  //   };
  // }, [tracks, conference]);
