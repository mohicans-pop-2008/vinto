import React from "react";

const Leave = ({ localTracks }) => {
  const leave = async () => {
    localTracks
      .forEach(async (track) => await track.dispose());
    await conference.leave();
    setConference(null);
    setTracks({});
    setName("");
    setId("");
  };
  return <button onClick={leave}>Leave Conference</button>;
};

export default Leave;
