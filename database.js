const { initializeApp } = require("firebase/app");
const {getFirestore,collection,getDocs,addDoc,query,where, updateDoc}=require('firebase/firestore');

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId:`${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId:`${process.env.REACT_APP_MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const db = getFirestore(app);

const roomRef=collection(db,'rooms');


async function isRoomIdPresent(roomId) {
  const q = query(collection(db, 'rooms'), where('roomId', '==', roomId));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

async function createRoom(roomId, code) {
  await addDoc(roomRef, {
    roomId,
    code,
  });
}

async function updateRoom(roomId, code) {
  const q = query(roomRef, where('roomId', '==', roomId));
  const querySnapshot = await getDocs(q);
  const roomDoc = querySnapshot.docs[0];
  await updateDoc(roomDoc.ref, { code:code });
}

async function getCode(roomId) {
  const q = query(collection(db, 'rooms'), where('roomId', '==', roomId));
  const querySnapshot = await getDocs(q);
  if(querySnapshot.empty)return null;
  const roomDoc = querySnapshot.docs[0];
  return roomDoc.data().code;
}

module.exports = { isRoomIdPresent, createRoom, updateRoom, getCode};