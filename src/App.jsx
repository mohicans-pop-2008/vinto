import { hot } from 'react-hot-loader';
import React from 'react';
import './App.css';

const loadAndConnect = ({ domain, room }) => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = `https://${domain}/libs/lib-jitsi-meet.min.js`;
  document.querySelector('head').appendChild(script);

  script.onload = () => {
    JitsiMeetJS.init();

    const configScript = document.createElement('script');
    configScript.src = `https://${domain}/config.js`;
    document.querySelector('head').appendChild(configScript);
    // configScript.onload = () => {
    //   connectandJoin({ domain, room, config }).then(resolve);
    // };
  };

});

const message = 'Welcome to vinto';
const App = () => {
  loadAndConnect({domain: 'meet.jit.si', room: 'some-default-room'});

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
};

export default hot(module)(App);
