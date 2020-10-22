import React from 'react';
import buttonStyle from '../style';

const Emoji = () => {
  const onClick = () => {
    // call a dispatch() here;
  };

  return (
    <button type="button" style={buttonStyle} onClick={onClick}>
      Emoji will go here!
    </button>
  );
};

export default Emoji;
