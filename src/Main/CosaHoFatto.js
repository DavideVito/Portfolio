import React, { useState, useEffect, useContext } from "react";
import LeftMenu from "../Helpers/Menus";
import MyContainer from "../Helpers/MyContainer.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { getLingua } from "./../Helpers/Utils";

import { userContext } from "../Helpers/Context/userContext";

import { stampaCard, getCards } from "../Helpers/Utils";
import EditableCard from "../Helpers/EditableCard";
import RiassuntyLogo from "../Foto/Riassunti/RiassuntyLogo.jpg";
import RiassuntyMainPage from "../Foto/Riassunti/RiassuntyMainPage.png";

import MyCard from "../Helpers/MyCard";

export default function CosaHoFatto() {
  let [cards, cambiaCards] = useState([]);
  let [utente] = useContext(userContext);

  useEffect(() => {
    getCards("projects", utente === "").then((c) => {
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
          {getLingua() === "en" ? "My Projects?" : "I miei progetti"}
        </Typography>
        <EditableCard tipo="projects" />
        <MyCard
          logo={RiassuntyLogo}
          fotoCard={RiassuntyMainPage}
          editMode={false}
          titolo="Riassunty"
          body={
            getLingua() === "en"
              ? "Website to be able to share digital materials uploaded by teachers and students"
              : "Sito per poter condividere materiali digitali caricati da docenti e studenti"
          }
        >
          <Link
            href="https://riassuntyreact.web.app"
            style={{ cursor: "pointer" }}
          >
            <Typography variant="h3">Riassunty</Typography>
          </Link>
          <Typography variant="h5" style={{ paddingLeft: "3%" }}>
            {getLingua() === "en" ? "Why?" : "Perché?"}
          </Typography>
          <div style={{ height: "20px" }}></div>

          <Typography paragraph style={{ paddingLeft: "3%" }}>
            {getLingua() === "en"
              ? "Offer students the opportunity to upload their own digital materials to share with other students"
              : "Offrire agli studenti la possibilità di poter caricare i propri materiali digitali da poter condividere con altri studenti"}
          </Typography>

          <Typography variant="h5" style={{ paddingLeft: "3%" }}>
            {getLingua() === "en" ? "What changes?" : "Cosa Cambia?"}
          </Typography>
          <Typography paragraph style={{ paddingLeft: "3%" }}>
            {getLingua() === "en"
              ? "Fast and efficient infrastructure, taking advantage of that provided by Google"
              : "Infrastruttura veloce e efficiente, sfruttando quella fornita da Google"}
          </Typography>
          <Typography paragraph style={{ paddingLeft: "3%" }}>
            {getLingua() === "en"
              ? "Useful and safe summaries as they are uploaded by students and approved by professors"
              : "Riassunti utili e sicuri in quanto caricati da studenti e approvati da professori"}
          </Typography>
        </MyCard>

        {stampaCard(cards, "projects", localStorage.getItem("utente"))}
      </MyContainer>
    </div>
  );
}
//<EditableCard />
