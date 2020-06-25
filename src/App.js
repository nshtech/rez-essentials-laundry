import React, { useState, useEffect } from 'react';import logo from './logo.svg';
import './App.css';
import MediaCard from './components/Support.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Firebase
import 'firebase/database';
import Frame from './components/Frame'
import Login from './components/Login'
import firebase from './components/shared/firebase';

import Profile from './components/Profile';


// Material UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



const THEME = createMuiTheme({
  typography: {
    "fontFamily": "\"Manrope\", sans-serif"
  }
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('user', null)
    }
  }, [user])

  return (
      <MuiThemeProvider theme={THEME}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={() => <Login user={user} />}></Route>
            <Route path="/home" exact component={() => <Frame user={user} />}></Route>
            <Route path="/" render={() => <div>404</div>}></Route>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
  );
}

export default App;
