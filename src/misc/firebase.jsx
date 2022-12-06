import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';


const config = {
  apiKey: "AIzaSyBST8lsDThNASWfAIHg0tZRUtrZ4hsRhfU",
  authDomain: "chat-web-app-f4df3.firebaseapp.com",
  databaseURL: "https://chat-web-app-f4df3-default-rtdb.firebaseio.com",
  projectId: "chat-web-app-f4df3",
  storageBucket: "chat-web-app-f4df3.appspot.com",
  messagingSenderId: "351785435364",
  appId: "1:351785435364:web:10f9b3c81d6f4053a56cf1"
};

const app = firebase.initializeApp(config);

export const auth = app.auth()
export const database = app.database()