import React, { useState } from 'react';

const JoinForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const onChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <h1>Welcome to vinto</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="name">
          Name:
          <input id="name" type="text" name="name" value={name} onChange={onChange} />
        </label>
        <button type="submit" disabled={!name}>Connect to this Conference!</button>
      </form>
    </>
  );
};

export default JoinForm;
