import { hot } from 'react-hot-loader';
import React, {useEffect} from 'react';
import './App.css';
import JitsiMeetJS from 'lib-jitsi-meet';
import config from '../utils/jitsi.config';
import $ from 'jquery';

const message = 'Welcome to vinto';

/* Define JitsiConnection event listeners */
const onConnectionSuccess = () => {
  console.log('CONNECTION_ESTABLISHED')
}

const App = () => {
  window.$ = $ // make it so Jitsi can find jquery selector
  JitsiMeetJS.init()
  let options = config
  options.serviceUrl = `${config.websocket}?room=some-default-room`
  let connection = new JitsiMeetJS.JitsiConnection(null, null, options)

  /* Register the JitsiConnection event listeners */
  connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
  useEffect(() => {
    async function connectToJitsiMeetServer () {
      await connection.connect();
    }
    connectToJitsiMeetServer();
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
};

export default hot(module)(App);
