import firebase from "firebase";
const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyA2UvwMd0SX7eiDUlc4qaa-Ex3N24P4jFU",
    authDomain: "instagram-clone-7a14c.firebaseapp.com",
    databaseURL: "https://instagram-clone-7a14c.firebaseio.com",
    projectId: "instagram-clone-7a14c",
    storageBucket: "instagram-clone-7a14c.appspot.com",
    messagingSenderId: "67222693986",
    appId: "1:67222693986:web:2483c8e69b2bba2123c93b",
    measurementId: "G-S9T9YPHX91"

});
const db= firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();
export {db,auth,storage};
 