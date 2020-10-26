import React from "react";
import Button from "@material-ui/core/Button";
import { X } from "@styled-icons/feather";
import styles from "./leave.module.css";

const Leave = ({ leave }) => {
  return (
    <Button
      onClick={leave}
      className={styles.leave}
      variant="outlined"
      startIcon={<X size="24" />}
    >
      Leave
    </Button>
  );
};

export default Leave;
