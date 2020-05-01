import app from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDl262UkWjK06xGlCUEa0ZRTY9hDZZ-f4M",
    authDomain: "luke-firewalker.firebaseapp.com",
    databaseURL: "https://luke-firewalker.firebaseio.com",
    projectId: "luke-firewalker",
    storageBucket: "luke-firewalker.appspot.com",
    messagingSenderId: "242425381404",
    appId: "1:242425381404:web:3b98467e2535ec382715d9",
    measurementId: "G-TTLQ4J44FL"
  };
  class Firebase {
	constructor() {
	  app.initializeApp(firebaseConfig);
	}
  }
   
  export default Firebase;