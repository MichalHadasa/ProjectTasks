import firebase from 'firebase';

 var firebaseConfig = {
    apiKey: "AIzaSyCbg7hKNZrmA-VejvmAiFurwdEbmVynCaQ",
    authDomain: "atraproject-1a786.firebaseapp.com",
    projectId: "atraproject-1a786",
    storageBucket: "atraproject-1a786.appspot.com",
    messagingSenderId: "872530160732",
    appId: "1:872530160732:web:cd02e4f604996535988a99"
  };
  try {
      console.log("firebase  work");
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }
  const fire = firebase;
export default fire;