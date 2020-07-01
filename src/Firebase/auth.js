import { auth, googleProvider } from "./firebase";

export function accediGoogle() {
  return auth().signInWithPopup(googleProvider);
}

export function esci() {
  localStorage.removeItem("utente");
  window.location.href = "/";
  auth().signOut();
}
