import React from 'react';
import Engagement from './engagement';
import Hands from './hands';
import { sidebarStyle } from '../style';

const Sidebar = () => (
  <div style={sidebarStyle}>
    <Engagement />
    <Hands />
  </div>
);

export default Sidebar;
