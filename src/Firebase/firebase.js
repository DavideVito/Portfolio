import firebase from "firebase";
import firebaseConfig from "./cred.js";

import "firebase/firestore";
import "firebase/auth";

import "firebase/storage";

// Initialize Firebase

export default firebase;
export let firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();
