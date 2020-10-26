import React, { useState } from "react";
import { joinPageStyle, joinFormStyle } from "./style";
import styles from "./joinForm.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

const JoinForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const onChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "room") {
      setRoom(e.target.value);
    }
  };

  return (
    <div style={joinPageStyle}>
      <img src="vinto-horizontal-logo.png" />
      <form style={joinFormStyle} onSubmit={(e) => onSubmit(e, name, room)}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          className={styles.inputs}
        />
        <TextField
          id="room"
          label="Room Name"
          variant="outlined"
          type="text"
          name="room"
          value={room}
          onChange={onChange}
          className={styles.inputs}
        />
        <Button
          type="submit"
          disabled={!name || !room}
          variant="contained"
          className={styles.inputs}
        >
          Join Room
        </Button>
      </form>
    </div>
  );
};

export default JoinForm;
