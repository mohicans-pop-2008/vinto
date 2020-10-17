import React from 'react';

const createRandomNum = () => Math.floor(Math.random() * 10000);

const App = () => {
  return <div>{createRandomNum()}</div>;
};

export default App;
