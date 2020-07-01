import React, { useState, useEffect, useContext } from "react";
import LeftMenu from "../Helpers/Menus";
import MyContainer from "../Helpers/MyContainer.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import ReactExample from "../Foto/ReactExample.png";
import EditableCard from "../Helpers/EditableCard";
import { stampaCard, getCards } from "../Helpers/Utils";
import { userContext } from "../Helpers/Context/userContext";

import CSSLogo from "../Foto/CSSLogo.png";
import HTMLlogo from "../Foto/HTMLlogo.png";
import JSLogo from "../Foto/JSLogo.png";
import PWALogo from "../Foto/PWALogo.png";
import SwiftLogo from "../Foto/SwiftLogo.png";
import ReactLogo from "../Foto/ReactLogo.png";

import MyCard from "../Helpers/MyCard";

export default function Studio() {
  let [cards, cambiaCards] = useState([]);
  let [utente] = useContext(userContext);
  useEffect(() => {
    getCards("competenze", utente === "").then((c) => {
      cambiaCards(c);
    });
  }, []);

  return (
    <div>
      <CssBaseline />
      <LeftMenu />
      <div style={{ height: "25px" }}></div>
      <MyContainer direzione="column">
        <Typography color="inherit" variant="h3" gutterBottom>
          Le mie competenze
        </Typography>

        <EditableCard tipo="competenze" />

        <MyCard
          logo={ReactLogo}
          titolo="React"
          fotoCard={ReactExample}
          sottotilolo="React JS"
          body={"ReactJS framework di programmazzione tra più usati"}
        >
          <Typography variant="h3">Hooks</Typography>
          <div style={{ height: "20px" }}></div>
          <Typography variant="h5" style={{ paddingLeft: "3%" }}>
            State
          </Typography>
          <Typography paragraph style={{ paddingLeft: "3%" }}>
            Utilizzo ottimale degli stati dell'applicazione
          </Typography>
          <Typography paragraph style={{ paddingLeft: "3%" }}>
            Conoscenza del ciclo di render e di eventuali problematiche dovute
          </Typography>

          <Typography variant="h5" style={{ paddingLeft: "3%" }}>
            Effect
          </Typography>
          <Typography paragraph style={{ paddingLeft: "3%" }}>
            Utilizzo ottimale dell'hook Effect, abbinato all'utilizzo degli
            stati
          </Typography>
        </MyCard>

        <MyCard
          logo={SwiftLogo}
          titolo="Swift"
          sottotilolo="Apple"
          body={"Conoscenza basilare del linguaggio di programmazione Swift"}
        ></MyCard>

        <MyCard
          logo={HTMLlogo}
          titolo="HTML 5"
          body={"Conoscenza della struttura di una pagina HTML"}
        />

        <MyCard
          logo={CSSLogo}
          titolo="CSS"
          body={"Conoscenza basilare dei fogli di stile a cascata"}
        />

        <MyCard
          logo={JSLogo}
          titolo="JavaScript"
          body={
            "Conoscenza avanzata del linguaggio di programmazione JavaScript seguendo lo standerd ES6"
          }
        >
          <Typography variant="h3">Classi</Typography>
          <div style={{ height: "20px" }}></div>

          <Typography paragraph style={{ paddingLeft: "3%" }}>
            Conoscenza e utilizzo della programmazione ad oggetti, standard UML
            <div style={{ height: "5px" }}></div>
            <Typography paragraph style={{ paddingLeft: "3%" }}>
              Diagramma delle classi
            </Typography>
            <Typography paragraph style={{ paddingLeft: "3%" }}>
              Diagramma degli stati d'uso
            </Typography>
          </Typography>
          <Typography variant="h3">Funzioni</Typography>
          <div style={{ height: "20px" }}></div>

          <Typography paragraph style={{ paddingLeft: "3%" }}>
            Conoscenza delle funzioni, <i>arrow functions</i>,{" "}
            <i>Higher-order functions</i>
          </Typography>
          <Typography variant="h3">Modellazione del DOM</Typography>
          <Typography variant="subtitle">
            <i>(Document Object Model)</i>
          </Typography>

          <div style={{ height: "20px" }}></div>

          <Typography paragraph style={{ paddingLeft: "3%" }}>
            Manipolazione del DOM tramite l'utilizzo di funzioni JavaScript
          </Typography>
          <Typography variant="h3">jQuery</Typography>

          <div style={{ height: "20px" }}></div>

          <Typography paragraph style={{ paddingLeft: "3%" }}>
            Conoscena della libreria jQuery
            <Typography paragraph style={{ paddingLeft: "3%" }}>
              Richieste AJAX <br />
              Manipolazione del DOM
              <br /> Animazioni
            </Typography>
          </Typography>
          <Typography variant="h3">NodeJS</Typography>

          <div style={{ height: "20px" }}></div>

          <Typography paragraph style={{ paddingLeft: "3%" }}>
            Conoscenza dell'ambiente NodeJs per la creazione di webserver
            <Typography paragraph style={{ paddingLeft: "3%" }}>
              <div style={{ height: "20px" }}></div>
              <Typography variant="h5">Express</Typography>
              <Typography>
                Utilizzo della libreria Express per la creazione di tali
                webserver
              </Typography>
            </Typography>
          </Typography>
        </MyCard>

        <MyCard
          logo={PWALogo}
          titolo="Progressive Web App"
          body={"Conoscenza e utilizzo della tecnologia PWA"}
        />

        {stampaCard(cards, "competenze", localStorage.getItem("utente"))}
      </MyContainer>
    </div>
  );
}
