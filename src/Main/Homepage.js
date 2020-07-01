import React, { useState, useEffect } from "react";
import LeftMenu from "../Helpers/Menus";
import MyContainer from "../Helpers/MyContainer.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { storageRef } from "../Firebase/firebase";
import Link from "@material-ui/core/Link";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import CircularProgress from "@material-ui/core/CircularProgress";

//gsutil cors set cors.json gs://myportfolio-ca2bd.appspot.com

//import io from "../Foto/io.JPG";

export default function Homepage() {
  let [file, cambiaFile] = useState(null);
  let [link, cambiaLink] = useState("");
  let [dimensione, cambiaDimensione] = useState(window.outerWidth);

  window.addEventListener("resize", (e) => {
    console.log(e.target.outerWidth);
    cambiaDimensione(e.target.outerWidth);
  });

  useEffect(() => {
    async function prendiPDF() {
      let a = await storageRef.child("CV.pdf").getDownloadURL();
      cambiaLink(a);
      let r = await fetch(a);

      r = await r.blob();

      let boh = await new Response(r).arrayBuffer();

      //let b64 = await convertBlobToBase64(r);

      cambiaFile(boh);
    }
    prendiPDF();
  }, []);

  return (
    <>
      <CssBaseline />
      <LeftMenu />
      <div style={{ height: "25px" }}></div>
      <MyContainer direzione="column" style={{ paddingLeft: "-20px" }}>
        <Typography color="inherit" variant="h1" gutterBottom>
          Davide Vitiello
        </Typography>

        <Link href={link}>
          <Typography color="inherit" gutterBottom variant="h4">
            Il mio CV
          </Typography>
        </Link>

        {dimensione > 600 ? (
          file === null ? (
            <CircularProgress />
          ) : (
            <Document file={file} loading={""}>
              <Page pageNumber={1} style={{ width: "80%" }} />
            </Document>
          )
        ) : (
          <Typography color="inherit" variant="body" gutterBottom>
            Non abbiamo mostrato il curriculum perché la dimension della
            finestra non lo conterrebbe
          </Typography>
        )}
      </MyContainer>
    </>
  );
}

/*
<Avatar
            style={{
              margin: "10px",
              width: "100px",
              height: "100px",
            }}
            alt="Davide Vitiello"
            src={io}
          />{" "}

*/
