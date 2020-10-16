import React from 'react';
import { emojiClick } from '../../store';

const Emoji = () => {
  const onClick = (e) => {
    // call a dispatch() here;
    dispatch(emojiClick(emojiType));
  };

  return (
    <button type="button" onClick={onClick}>
      Emoji will go here!
    </button>
  );
};

export default Emoji;
