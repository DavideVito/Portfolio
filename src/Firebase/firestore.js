import { firestore } from "./firebase";

export async function nascondiDocumento(id) {
  await firestore.collection("Cards").doc(`${id}`).set({ visible: false });
}

export async function eliminaDocumento(id) {
  await firestore.collection("Cards").doc(`${id}`).delete();
}

export async function generaDocumento(tipo) {
  let a = await firestore
    .collection("Cards")
    .add({ tipo: tipo, visibile: false });

  return a.id;
}

export async function rendiVisibile(id) {
  await firestore
    .collection("Cards")
    .doc(`${id}`)
    .set({ visibile: true }, { merge: true });
}

export async function impostaTitolo(id, titolo) {
  await firestore
    .collection("Cards")
    .doc(`${id}`)
    .set({ titolo }, { merge: true });
}

export async function impostaSottotitolo(id, sottotilo) {
  await firestore
    .collection("Cards")
    .doc(`${id}`)
    .set({ sottotilo }, { merge: true });
}

export async function impostaContenuti(id, contenuti) {
  await firestore
    .collection("Cards")
    .doc(`${id}`)
    .set({ contenuti }, { merge: true });
}

export async function impostaImmagineGrossa(id, fotoGrossa) {
  await firestore
    .collection("Cards")
    .doc(`${id}`)
    .set({ fotoGrossa }, { merge: true });
}

export async function impostaLogo(id, logo) {
  await firestore
    .collection("Cards")
    .doc(`${id}`)
    .set({ logo }, { merge: true });
}

export async function getCards(tipo, vis = false) {
  let a = firestore.collection("Cards").where("tipo", "==", `${tipo}`);

  if (vis) {
    a = await a.get();
  } else {
    a = await a.where("visibile", "==", true);
  }

  let b = [];

  a.docs.forEach((card) => {
    b.push({ card: card.data(), id: card.id });
  });

  return b;
}
