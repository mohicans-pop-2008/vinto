import React from 'react';

const Emoji = (props) => {
  const onClick = () => {
    dispatch();
  };

  return (
    <button type="button" onClick={onClick}>
      Emoji will go here!
    </button>
  );
};

export default Emoji;
