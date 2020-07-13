import React, { useState, useEffect, useContext } from "react";
import LeftMenu from "../Helpers/Menus";
import MyContainer from "../Helpers/MyContainer.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import ReactExample from "../Foto/ReactExample.png";
import EditableCard from "../Helpers/EditableCard";
import { stampaCard, getCards } from "../Helpers/Utils";
import { getLingua } from "./../Helpers/Utils";
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
          {getLingua() === "en" ? "My skills" : "Le mie competenze"}
        </Typography>

        <EditableCard tipo="competenze" />

        <MyCard
          logo={ReactLogo}
          titolo="React"
          fotoCard={ReactExample}
          sottotilolo="React JS"
          body={
            getLingua() === "en"
              ? "ReactJS programming framework among the most used"
              : "ReactJS framework di programmazzione tra più usati"
          }
        >
          <Typography variant="h3">Hooks</Typography>
          <div style={{ height: "20px" }}></div>
          <Typography variant="h5" style={{ paddingLeft: "3%" }}>
            State
          </Typography>
          <Typography paragraph style={{ paddingLeft: "3%" }}>
            {getLingua() === "en"
              ? "Optimal use of application states"
              : "Utilizzo ottimale degli stati dell'applicazione"}
          </Typography>
          <Typography paragraph style={{ paddingLeft: "3%" }}>
            {getLingua() === "en"
              ? "Knowledge of the rendering cycle and any problems due"
              : "Conoscenza del ciclo di render e di eventuali problematiche dovute"}
          </Typography>

          <Typography variant="h5" style={{ paddingLeft: "3%" }}>
            Effect
          </Typography>
          <Typography paragraph style={{ paddingLeft: "3%" }}>
            {getLingua() === "en"
              ? "Optimal use of the hook Effect, combined with the use of the states"
              : "Utilizzo ottimale della hook Effect, abbinato all'utilizzo degli stati"}
          </Typography>
        </MyCard>

        <MyCard
          logo={SwiftLogo}
          titolo="Swift"
          sottotilolo="Apple"
          body={
            getLingua() === "en"
              ? "Basic knowledge of the Swift programming languageReactJS programming framework among the most used"
              : "Conoscenza basilare del linguaggio di programmazione Swift"
          }
        ></MyCard>

        <MyCard
          logo={HTMLlogo}
          titolo="HTML 5"
          body={
            getLingua() === "en"
              ? "Knowledge of the structure of an HTML page"
              : "Conoscenza della struttura di una pagina HTML"
          }
        />

        <MyCard
          logo={CSSLogo}
          titolo="CSS"
          body={
            getLingua() === "en"
              ? "Knowledge of cascading style sheets"
              : "Conoscenza dei fogli di stile a cascata"
          }
        />

        <MyCard
          logo={JSLogo}
          titolo="JavaScript"
          body={
            getLingua() === "en"
              ? "Advanced knowledge of the JavaScript programming language following the ES6 standerd"
              : "Conoscenza avanzata del linguaggio di programmazione JavaScript seguendo lo standerd ES6"
          }
        >
          <Typography variant="h3">Classi</Typography>
          <div style={{ height: "20px" }}></div>

          <Typography paragraph style={{ paddingLeft: "3%" }}>
            {getLingua() === "en"
              ? "Knowledge and use of object-oriented programming, UML standard"
              : "Conoscenza e utilizzo della programmazione ad oggetti, standard UML"}

            <div style={{ height: "5px" }}></div>
            <Typography paragraph style={{ paddingLeft: "3%" }}>
              {getLingua() === "en"
                ? "Class Diagram"
                : "Diagramma Delle Classi"}
            </Typography>
            <Typography paragraph style={{ paddingLeft: "3%" }}>
              {getLingua() === "en"
                ? "Use case diagram"
                : "Diagramma dei casi d'uso"}
            </Typography>
          </Typography>
          <Typography variant="h3">
            {" "}
            {getLingua() === "en" ? "Functions" : "Funzioni"}
          </Typography>
          <div style={{ height: "20px" }}></div>

          <Typography paragraph style={{ paddingLeft: "3%" }}>
            {getLingua() === "en"
              ? "Knowledge of functions,  <i>arrow functions</i>, <i>Higher-order functions</i>"
              : "Conoscenza delle funzioni, <i>arrow functions</i>, <i>Higher-order functions</i>"}
          </Typography>
          <Typography variant="h3">
            {getLingua() === "en" ? "DOM modeling" : "Modellazione del DOM"}
          </Typography>
          <Typography variant="subtitle">
            <i>(Document Object Model)</i>
          </Typography>

          <div style={{ height: "20px" }}></div>

          <Typography paragraph style={{ paddingLeft: "3%" }}>
            {getLingua() === "en"
              ? "DOM manipulation through the use of JavaScript functions"
              : "Manipolazione del DOM tramite l'utilizzo di funzioni JavaScript"}
          </Typography>
          <Typography variant="h3">jQuery</Typography>

          <div style={{ height: "20px" }}></div>

          <Typography paragraph style={{ paddingLeft: "3%" }}>
            {getLingua() === "en"
              ? "Knowledge of the jQuery library"
              : "Conoscenza della libreria jQuery"}

            <Typography paragraph style={{ paddingLeft: "3%" }}>
              {getLingua() === "en"
                ? "AJAX Requests Manipulation of the DOM Animations"
                : "Richieste AJAX Manipolazione del DOM Animazioni"}
            </Typography>
          </Typography>
          <Typography variant="h3">NodeJS</Typography>

          <div style={{ height: "20px" }}></div>

          <Typography paragraph style={{ paddingLeft: "3%" }}>
            {getLingua() === "en"
              ? "Knowledge of the NodeJs environment for creating web servers"
              : "Conoscenza dell'ambiente NodeJs per la creazione di web server"}

            <Typography paragraph style={{ paddingLeft: "3%" }}>
              <div style={{ height: "20px" }}></div>
              <Typography variant="h5">Express</Typography>
              <Typography>
                {getLingua() === "en"
                  ? "Use of the Express library for the creation of these webservers"
                  : "Utilizzo della libreria Express per la creazione di tali web server"}
              </Typography>
            </Typography>
          </Typography>
        </MyCard>

        <MyCard
          logo={PWALogo}
          titolo="Progressive Web App"
          body={
            getLingua() === "en"
              ? "Knowledge and use of PWA technology"
              : "Conoscenza e utilizzo della tecnologia PWA"
          }
        />

        {stampaCard(cards, "competenze", localStorage.getItem("utente"))}
      </MyContainer>
    </div>
  );
}
