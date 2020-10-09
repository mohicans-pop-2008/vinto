import { hot } from 'react-hot-loader';
import React from 'react';
import $ from 'jquery'
import './App.css';
window.$ = $

function connectionSuccessful(room, conference) {
  console.log('=============> CONNECTION SUCCESSFUL <============');
  conference = this.initJitsiConference(room, {});
  // conference.on();
};

const connectionFailed = () => {
  console.log('=============> CONNECTION FAILED <============');
};

const loadAndConnect = async ({ domain, room }) => {
  const script = document.createElement('script');
  script.src = `https://${domain}/libs/lib-jitsi-meet.min.js`;
  document.querySelector('head').appendChild(script);

  let conference;
  script.onload = () => {
    JitsiMeetJS.init();

    const configScript = document.createElement('script');
    configScript.src = `https://${domain}/config.js`;
    document.querySelector('head').appendChild(configScript);
    configScript.onload = async () => {
      config.serviceUrl = config.websocket || config.bosh
      config.serviceUrl += `?room=${room}`
      const connection = new JitsiMeetJS.JitsiConnection(null, undefined, config)
      connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, connectionSuccessful.bind(connection, room, conference))
      connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, connectionFailed)
      await connection.connect();
    }
  };
  return conference
};

const message = 'Welcome to vinto';
const App = () => {
  loadAndConnect({ domain: 'meet.jit.si', room: 'some-default-room' });

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
};

export default hot(module)(App);
