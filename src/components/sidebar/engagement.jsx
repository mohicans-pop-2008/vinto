import React from 'react';
import { useSelector } from 'react-redux';

const Engagement = () => {
  const engagementScore = useSelector((state) => state.engagementScore);
  return (
    <button type="button">
      Engagement Score:
      {' '}
      {engagementScore}
    </button>
  );
};
export default Engagement;
