import React from "react";
import Typography from "@material-ui/core/Typography";
import MyCard from "./MyCard";

import { storageRef } from "../Firebase/firebase";

import EditableCard from "./EditableCard";
import { getCards as gc } from "../Firebase/firestore";
const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATOR_KEY;
export function randomUDID() {
  let sGuid = "";
  for (let i = 0; i < 32; i++) {
    sGuid += Math.floor(Math.random() * 0xf).toString(0xf);
  }
  return sGuid;
}

function getParagrafi(da) {
  let righe;

  if (da) {
    righe = da && da.split("\n");
  } else {
    return;
  }

  return righe.map((riga) => {
    return (
      <Typography style={{ paddingLeft: "3%" }} paragraph>
        {riga}
      </Typography>
    );
  });
}

export function getLingua() {
  return window.navigator.language.slice(0, 2);
}

export async function getCards(tipo, vis) {
  let lingua = getLingua();
  let cards = await gc(tipo, vis, lingua);

  async function prendiLink() {
    let b = [];

    for (let fe of cards) {
      let c = fe.card;

      try {
        let linkFoto = await storageRef.child(c.logo).getDownloadURL();
        c.logo = linkFoto;
      } catch (error) {}

      try {
        let linkImmagine = await storageRef
          .child(c.fotoGrossa)
          .getDownloadURL();
        c.immagine = linkImmagine;
      } catch (error) {}

      b.push({ card: c, id: fe.id });
    }

    return b;
  }

  let b = await prendiLink();

  return b;
}

export function stampaCard(cards, tipo, user) {
  return cards.map(({ card, id }) => {
    return (
      <div style={{ paddingTop: "20px" }} id={id}>
        {user ? (
          <>
            <EditableCard tipo={tipo} oldData={card} oid={id} />
          </>
        ) : (
          <MyCard
            editMode={false}
            key={id}
            logo={card.logo}
            fotoCard={card.immagine}
            titolo={card.titolo}
            body={getParagrafi(card.sottotilo)}
          >
            {typeof card.contenuti !== "undefined" ? (
              <>{getParagrafi(card.contenuti)}</>
            ) : (
              ""
            )}
          </MyCard>
        )}
      </div>
    );
  });
}

export async function traduci(testo) {
  debugger;
  let apiKey = API_KEY;
  let link = `https://translation.googleapis.com/language/translate/v2?target=en&key=${apiKey}&q=${testo}`;

  link = encodeURI(link);

  let ris = await fetch(link);

  ris = await ris.json();
  return ris.data.translations[0].translatedText;
}

//<EditableCard oldData={card} oid={id} tipo={tipo} />
