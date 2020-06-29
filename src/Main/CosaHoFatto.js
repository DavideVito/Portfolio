import React, { useState, useEffect } from "react";
import LeftMenu from "../Helpers/Menus";
import MyContainer from "../Helpers/MyContainer.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { storageRef } from "../Firebase/firebase";
import { getCards } from "../Firebase/firestore";

import EditableCard from "../Helpers/EditableCard";
import RiassuntyLogo from "../Foto/Riassunti/RiassuntyLogo.jpg";
import RiassuntyMainPage from "../Foto/Riassunti/RiassuntyMainPage.png";
import { randomUDID } from "../Helpers/Utils";
import MyCard from "../Helpers/MyCard";

export default function CosaHoFatto() {
  let [cards, cambiaCards] = useState([]);

  useEffect(() => {
    getCards("projects").then((cards) => {
      let b = [];

      async function prendiLink() {
        for (let c of cards) {
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

          b.push(c);
        }
      }

      prendiLink().then(() => {
        cambiaCards(b);
      });
    });
  }, []);

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

  return (
    <div>
      <CssBaseline />
      <LeftMenu />
      <div style={{ height: "25px" }}></div>
      <MyContainer direzione="column">
        <Typography color="inherit" variant="h3" gutterBottom>
          I miei progetti
        </Typography>

        <MyCard
          logo={RiassuntyLogo}
          fotoCard={RiassuntyMainPage}
          editMode={false}
          titolo="Riassunty"
          body={
            "Sito per poter condividere materiali digitali caricati da docenti e studenti"
          }
        >
          <Link
            href="https://riassuntyreact.web.app"
            style={{ cursor: "pointer" }}
          >
            <Typography variant="h3">Riassunty</Typography>
          </Link>
          <Typography variant="h5" style={{ paddingLeft: "3%" }}>
            {" "}
            Perché
          </Typography>
          <div style={{ height: "20px" }}></div>

          <Typography paragraph style={{ paddingLeft: "3%" }}>
            Offrire agli studenti la possibilità di poter caricare i propri
            materiali digitali da poter condividere con altri studenti
          </Typography>

          <Typography variant="h5" style={{ paddingLeft: "3%" }}>
            Cosa Cambia?
          </Typography>
          <Typography paragraph style={{ paddingLeft: "3%" }}>
            Infrastruttura veloce e efficiente, sfruttando l'infrastruttura
            Google
          </Typography>
          <Typography paragraph style={{ paddingLeft: "3%" }}>
            Riassunti utili e sicuri in quanto caricati da studenti e approvati
            da prodessori
          </Typography>
        </MyCard>

        {cards.map((card) => {
          return (
            <MyCard
              editMode={false}
              key={randomUDID()}
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
          );
        })}
      </MyContainer>
    </div>
  );
}
//<EditableCard />
