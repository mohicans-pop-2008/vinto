import React from 'react';
import Button from '@material-ui/core/Button'
import { Cast } from '@styled-icons/feather'

const ScreenShare = () => (
  <Button type="button" startIcon={<Cast size="24" />} color="inherit">Share Screen</Button>
);

export default ScreenShare;
