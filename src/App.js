import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MediaCard from './components/Support.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Firebase
import 'firebase/database';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import DashboardWrapper from './components/DashboardWrapper'
import Account from './components/Account'
import CustomerSupport from './components/CustomerSupport'
import CSupport from './components/CSupport'
import Login from './components/Login'
import firebase from './components/shared/firebase';

import Profile from './components/Profile';


// Material UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Dashboard from './components/Dashboard';



const THEME = createMuiTheme({
  typography: {
    "fontFamily": "\"Manrope\", sans-serif"
  }
});

function App() {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);


  return (
      <MuiThemeProvider theme={THEME}>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard" exact component={() => <DashboardWrapper />}></Route>
            <Route path="/account" exact component={() => <Account />}></Route>
            <Route path="/support" exact component={() => <CustomerSupport />}></Route>
            <Route path="/" exact component={() => <SignIn />}></Route>
            <Route path="/signup" exact component={() => <SignUp />}></Route>
            <Route path="/404" render={() => <div>404</div>}></Route>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
  );
}

export default App;
