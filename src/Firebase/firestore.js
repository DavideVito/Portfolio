import { firestore } from "./firebase";
import { traduci } from "./../Helpers/Utils";

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
  let testoIt = sottotilo;
  let testoEn = await traduci(sottotilo);

  let doc = { it: { sottilo: testoIt }, en: { sottotilo: testoEn } };

  await firestore.collection("Cards").doc(`${id}`).set(doc, { merge: true });
}

export async function impostaContenuti(id, contenuti) {
  let testoIt = contenuti;
  let testoEn = await traduci(contenuti);

  let doc = { it: { contenuti: testoIt }, en: { contenuti: testoEn } };

  await firestore.collection("Cards").doc(`${id}`).set(doc, { merge: true });
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

export async function getCards(tipo, vis = false, lingua) {
  let a = firestore.collection("Cards").where("tipo", "==", `${tipo}`);

  if (vis) {
    a = await a.get();
  } else {
    a = await a.where("visibile", "==", true);
  }

  let b = [];
  a.docs.forEach((card) => {
    let carta = card.data();

    let titolo = carta.titolo;
    let visibile = carta.visibile;
    let tipo = carta.tipo;
    let fotoGrossa = carta.fotoGrossa;
    let logo = carta.logo;

    let contenuti = "";

    try {
      contenuti = carta[lingua || "en"].contenuti || "";
    } catch (error) {}

    let sottotilo = "";
    try {
      sottotilo = carta[lingua || "en"].sottotilo || "";
    } catch (error) {}

    let mCard = {
      titolo,
      visibile,
      tipo,
      fotoGrossa,
      logo,
      contenuti,
      sottotilo,
    };

    b.push({ card: mCard, id: card.id });
  });

  return b;
}
