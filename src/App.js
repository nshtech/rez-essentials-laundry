import React from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/database';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

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
    <Dashboard></Dashboard>
  );
}

export default App;
