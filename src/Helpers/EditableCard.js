import React, { useState, useEffect } from "react";
import MyContainer from "../Helpers/MyContainer.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Avatar from "@material-ui/core/Avatar";

import AddIcon from "@material-ui/icons/Add";
import Dropzone from "react-dropzone";
import {
  generaDocumento,
  elimina,
  impostaTitolo,
  rendiVisibile,
  impostaSottotitolo,
  impostaContenuti,
  impostaLogo,
  impostaImmagineGrossa,
} from "../Firebase/firestore";

import { randomUDID } from "../Helpers/Utils";
import Button from "@material-ui/core/Button";
import { storageRef } from "../Firebase/firebase";

import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import debounce from "debounce";
import MyCard from "../Helpers/MyCard";

export default function EditableCard() {
  let [titolo, cambiaTitolo] = useState("");
  let [sottotitolo, cambiaSottotitolo] = useState("");
  let [logo, cambiaLogo] = useState("");
  let [immagine, cambiaImmagine] = useState("");
  let [stato, cambiaStato] = useState(false);
  let [contenutiSotto, cambiaContenutiSotto] = useState("");
  let [id, cambiaId] = useState("");
  let [progressoLogo, cambiaProgressoLogo] = useState(0);
  let [progressoImmagine, cambiaProgressoImmagine] = useState(0);

  useEffect(() => {
    async function a() {
      let id = await generaDocumento("projects");
      inizializzaRoba(id);
      cambiaId(id);
    }
    a();
  }, []);

  useEffect(() => {
    if (stato) {
      document.getElementById("textAreaContenuti").onkeypress = debounce(
        (e) => {
          cambiaContenutiSotto(e.target.value);

          impostaContenuti(id, e.target.value);
        },
        timeOut
      );
    }
  }, [stato]);

  const timeOut = 1500;

  function inizializzaRoba(id) {
    document.getElementById("titolo").onkeypress = debounce((e) => {
      cambiaTitolo(e.target.value);

      impostaTitolo(id, e.target.value);
    }, timeOut);

    document.getElementById("textAreaSottotitolo").onkeypress = debounce(
      (e) => {
        cambiaSottotitolo(e.target.value);
        impostaSottotitolo(id, e.target.value);
      },
      timeOut
    );
  }

  return (
    <div>
      <CssBaseline />

      <div style={{ height: "25px" }}></div>
      <MyContainer direzione="row">
        {progressoLogo !== 0 ? (
          <CircularProgress variant="static" value={progressoLogo} />
        ) : (
          <></>
        )}

        {progressoImmagine !== 0 ? (
          <CircularProgress variant="static" value={progressoImmagine} />
        ) : (
          <></>
        )}
      </MyContainer>
      <div style={{ height: "25px" }}></div>
      <MyContainer direzione="column">
        <MyCard
          editMode={true}
          logo={
            <>
              {logo !== "" ? (
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "90%", height: "90%" }}
                />
              ) : (
                <>
                  <Dropzone
                    onDrop={([file]) => {
                      let str = randomUDID();
                      storageRef
                        .child(str)
                        .put(file)
                        .on(
                          "state_changed",
                          (snapshot) => {
                            let progress =
                              (snapshot.bytesTransferred /
                                snapshot.totalBytes) *
                              100;

                            cambiaProgressoLogo(progress);
                          },
                          () => {
                            alert(
                              "Errore durante il caricamento, we're sorry :("
                            );
                          },
                          (s) => {
                            cambiaProgressoLogo(0);
                            impostaLogo(id, str);
                            storageRef
                              .child(str)
                              .getDownloadURL()
                              .then((a) => {
                                cambiaLogo(a);
                              });
                          }
                        );
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <Avatar style={{ cursor: "pointer" }}>
                            <AddIcon />
                          </Avatar>{" "}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </>
              )}
            </>
          }
          fotoCard={
            <>
              {immagine !== "" ? (
                <img
                  src={immagine}
                  alt="immagine"
                  style={{ width: "90%", height: "90%" }}
                />
              ) : (
                <Dropzone
                  onDrop={([file]) => {
                    let str = randomUDID();
                    storageRef
                      .child(str)
                      .put(file)
                      .on(
                        "state_changed",
                        (snapshot) => {
                          let progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;

                          cambiaProgressoImmagine(progress);
                        },
                        () => {
                          alert(
                            "Errore durante il caricamento, we're sorry :("
                          );
                        },
                        (s) => {
                          cambiaProgressoImmagine(0);
                          impostaImmagineGrossa(id, str);
                          storageRef
                            .child(str)
                            .getDownloadURL()
                            .then((a) => {
                              cambiaImmagine(a);
                            });
                        }
                      );
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <center
                          style={{
                            marginBottom: "25px",
                            cursor: "pointer",
                          }}
                        >
                          <MyContainer style={{}}>
                            <Avatar>
                              <AddIcon />
                            </Avatar>{" "}
                          </MyContainer>
                        </center>
                      </div>
                    </section>
                  )}
                </Dropzone>
              )}
            </>
          }
          titolo={<TextField id="titolo" label="Standard" />}
          body={
            <>
              <CssBaseline />

              <TextField
                style={{
                  marginTop: "25px",
                  height: "100px",
                  width: "100%",
                }}
                id="textAreaSottotitolo"
                label="Testo"
                multiline
                rows={4}
                variant="outlined"
              />
            </>
          }
        >
          <Switch
            checked={stato}
            onChange={() => {
              cambiaStato(!stato);
            }}
            name="checkedB"
            color="primary"
          />
          <br />
          {stato ? (
            <TextField
              style={{
                marginTop: "25px",
                height: "100px",
                width: "100%",
              }}
              id="textAreaContenuti"
              label="Testo"
              multiline
              rows={4}
              variant="outlined"
            />
          ) : (
            <></>
          )}
        </MyCard>
        <div style={{ height: "15px" }}></div>
        <MyContainer direzione="row">
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              rendiVisibile(id);
            }}
          >
            <CheckIcon />
          </Button>
          <div style={{ width: "25px" }}></div>
          <Button
            variant="contained"
            color="secondary"
            onClick={async () => {
              elimina(id);
            }}
          >
            <ClearIcon />
          </Button>
        </MyContainer>
      </MyContainer>
    </div>
  );
}
/*


<center>
                    {
                      let str = randomUDID();
                      storageRef
                        .child(str)
                        .put(e.target.files[0])
                        .on(
                          "state_changed",
                          (snapshot) => {
                            let progress =
                              (snapshot.bytesTransferred /
                                snapshot.totalBytes) *
                              100;

                            cambiaProgressoImmagine(progress);
                          },
                          () => {
                            alert(
                              "Errore durante il caricamento, we're sorry :("
                            );
                          },
                          (s) => {
                            cambiaProgressoImmagine(0);
                            impostaImmagineGrossa(id, str);
                            storageRef
                              .child(str)
                              .getDownloadURL()
                              .then((a) => {
                                cambiaImmagine(a);
                              });
                          }
                        );
                    }




*/
