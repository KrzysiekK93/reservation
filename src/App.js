import React , { useEffect, useState } from 'react';
import './App.css';
import Content from './components/content/Content';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { firebase } from '@firebase/app';
import '@firebase/firestore'

const config = {
    apiKey: "AIzaSyAE0_VsrjRZiE8Kp_bITQh_g3XAGrAqrdQ",
    authDomain: "reservation-system-cfa56.firebaseapp.com",
    databaseURL: "https://reservation-system-cfa56.firebaseio.com",
    projectId: "reservation-system-cfa56",
    storageBucket: "reservation-system-cfa56.appspot.com",
    messagingSenderId: "286741290345",
    appId: "1:286741290345:web:5b455c056bc9d055da31f8",
    measurementId: "G-JPYWG2DD9F"
};

firebase.initializeApp(config);
const db = firebase.firestore();
const useStyles = makeStyles(theme =>
  createStyles({
    
    input: {
      display: 'none',
    },
  }),
);

export default function App() {
  const [allData, setAllData] = useState({
    isLoaded: false,
    data: []
  });
  const classes = useStyles();

  useEffect(() => {
    db.collection("data")
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      setAllData({
        isLoaded: true,
        data
      })
    });
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Reservation system</h1>
      </header>
      <Content data={allData}/>
    </div>
  );
}