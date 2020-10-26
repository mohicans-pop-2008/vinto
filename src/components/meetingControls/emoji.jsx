import React from "react";
import Button from "@material-ui/core/Button";
import { EmojiEmotions } from "@styled-icons/material-sharp";

const Emoji = () => {
  const onClick = () => {
    // call a dispatch() here;
  };

  return (
    <Button
      type="button"
      endIcon={<EmojiEmotions size="24" />}
      onClick={onClick}
      color="inherit"
    >
      Emote
    </Button>
  );
};

export default Emoji;
