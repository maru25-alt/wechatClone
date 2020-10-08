import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCL_d6h0ll_q8IQT3XvI1xn2XdE01Qz9vs",
    authDomain: "wechat-clone-b15bc.firebaseapp.com",
    databaseURL: "https://wechat-clone-b15bc.firebaseio.com",
    projectId: "wechat-clone-b15bc",
    storageBucket: "wechat-clone-b15bc.appspot.com",
    messagingSenderId: "29043597917",
    appId: "1:29043597917:web:55b4d803f3fbf01e13a3b4",
    measurementId: "G-1R9NKHKQ6C"
  };

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {auth, db, storage, timestamp}
export default firebase