import firebase from 'firebase/app';
import 'firebase/auth';
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
export default firebase;