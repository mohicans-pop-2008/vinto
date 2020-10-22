import React from 'react';
import { useSelector } from 'react-redux';
import buttonStyle from '../style';

const Engagement = () => {
  const engagementScore = useSelector((state) => state.engagementScore);
  return (
    <button type="button" style={buttonStyle}>
      Engagement Score: {engagementScore}
    </button>
  );
};
export default Engagement;
