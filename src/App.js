import React from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAfTUULx93uJ8x9gZN1gmTCYFT9zTDz_Xc",
  authDomain: "rez-laundry-app.firebaseapp.com",
  databaseURL: "https://rez-laundry-app.firebaseio.com",
  projectId: "rez-laundry-app",
  storageBucket: "rez-laundry-app.appspot.com",
  messagingSenderId: "453879510299",
  appId: "1:453879510299:web:edbf22170111e441500fbe",
  measurementId: "G-VJM4T1CKYX"
};

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
