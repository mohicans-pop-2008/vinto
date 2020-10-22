import React, { useState } from 'react';
// import { joinFormStyle } from './style';

const JoinForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const onChange = (e) => {
    if(e.target.name === 'name') {
      setName(e.target.value);
    }
    if(e.target.name === 'room') {
      setRoom(e.target.value)
    }
  };

  return (
    <>
      <h1>Welcome to vinto</h1>
      <form onSubmit={(e) => onSubmit(e, name, room)}>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />
        </label>
        <label htmlFor="name">
          RoomName:
          <input id="room" type="text" name="room" value={room} onChange={onChange} />
        </label>
        <button type="submit" disabled={!name || !room}>Connect to this Conference!</button>
      </form>
    </>
  );
};

export default JoinForm;
