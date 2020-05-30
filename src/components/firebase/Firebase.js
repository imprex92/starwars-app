import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCKRNu2g84uziWfRBWZCb9LIzIt4A25QQY",
    authDomain: "luke-favfilewalker.firebaseapp.com",
    databaseURL: "https://luke-favfilewalker.firebaseio.com",
    projectId: "luke-favfilewalker",
    storageBucket: "luke-favfilewalker.appspot.com",
    messagingSenderId: "406443333531",
    appId: "1:406443333531:web:5a850a89f67fb012d2f33e",
    measurementId: "G-M5MSSH2VXL"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.analytics();

  export default firebase
