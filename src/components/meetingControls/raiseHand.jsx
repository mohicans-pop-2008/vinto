import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { raiseHand, lowerHand } from "../../store";
import Button from "@material-ui/core/Button";
import { Hand } from "@styled-icons/entypo";
import { HandLeft } from "@styled-icons/ionicons-outline";
import buttonStyle from "../style";

const RaiseHand = ({ name, id }) => {
  const [handRaised, setHandRaised] = useState(false);
  const dispatch = useDispatch();
  // const name = useSelector((state) => state.name);
  const onClick = () => {
    if (handRaised) {
      dispatch(lowerHand({ uniqueID: name + id }));
    } else {
      dispatch(raiseHand({ name, uniqueID: name + id }));
    }
    setHandRaised(!handRaised);
  };
  return (
    <>
      {handRaised ? (
        <Button
          type="button"
          onClick={onClick}
          startIcon={<HandLeft size="24" />}
        >
          Lower Hand
        </Button>
      ) : (
        <Button type="button" onClick={onClick} endIcon={<Hand size="24" />}>
          Raise Hand
        </Button>
      )}
    </>
  );
};

export default RaiseHand;
