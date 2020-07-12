import React, { useState, useEffect, useContext } from "react";
import MyContainer from "../Helpers/MyContainer.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";

import { auth } from "../Firebase/firebase";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import Avatar from "@material-ui/core/Avatar";
import { accediGoogle } from "../Firebase/auth";
import AddIcon from "@material-ui/icons/Add";
import { userContext } from "./Context/userContext";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Dropzone from "react-dropzone";
import {
  generaDocumento,
  impostaTitolo,
  rendiVisibile,
  impostaSottotitolo,
  impostaContenuti,
  nascondiDocumento,
  eliminaDocumento,
  impostaLogo,
  impostaImmagineGrossa,
} from "../Firebase/firestore";

import { randomUDID } from "../Helpers/Utils";

import { storageRef } from "../Firebase/firebase";

import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import debounce from "debounce";
import MyCard from "../Helpers/MyCard";

export default function EditableCard({ tipo, oldData, oid }) {
  let [titolo, cambiaTitolo] = useState("");
  let [sottotitolo, cambiaSottotitolo] = useState("");
  let [logo, cambiaLogo] = useState("");
  let [immagine, cambiaImmagine] = useState("");
  const timeOut = 1500;
  let [stato, cambiaStato] = useState(false);
  let [contenutiSotto, cambiaContenutiSotto] = useState("");
  let [id, cambiaId] = useState(oid);
  let [progressoLogo, cambiaProgressoLogo] = useState(0);
  let [progressoImmagine, cambiaProgressoImmagine] = useState(0);
  let [utente, cambiaUtente] = useContext(userContext);
  let [mostraPulsante, cambiaMostraPulsante] = useState(oldData);
  let [modifica, cambiaModifica] = useState(false);

  async function generaDocumentoAndDisegnaCard() {
    async function a() {
      let nid = await generaDocumento(tipo);
      try {
        inizializzaRoba(nid);
      } catch (error) {}

      cambiaId(nid);
    }

    if (utente) {
      if (oldData) {
        inizializzaRoba(oldData);
      } else {
        a();
      }
    }
  }

  useEffect(() => {
    async function f() {
      let u = await auth().currentUser;

      if (u) {
        localStorage.setItem("utente", JSON.stringify(u));
        utente = u;
        cambiaUtente(utente);
      }

      u = localStorage.getItem("utente");
      if (u) {
        localStorage.setItem("utente", u);
        utente = JSON.parse(u);
        cambiaUtente(utente);
      }
    }
    f();
  }, []);

  useEffect(() => {
    if (oldData && oldData.immagine) {
      cambiaImmagine(oldData.immagine);
    }
    if (oldData && oldData.logo) {
      cambiaLogo(oldData.logo);
    }
  }, []);

  function resettaForm() {
    document.getElementById("form").reset();
  }

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

  function inizializzaRoba(id) {
    console.log("inizializzo");
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

  if (!utente) {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          accediGoogle().then(({ user }) => {
            let utente = user;
            console.log(JSON.stringify(utente));
            localStorage.setItem("utente", JSON.stringify(utente));

            cambiaUtente(utente);
          });
        }}
      >
        Accedi
      </Button>
    );
  } else {
    if (!mostraPulsante) {
      return (
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            cambiaMostraPulsante(true);
            generaDocumentoAndDisegnaCard();
            cambiaModifica(true);
          }}
        >
          +
        </Button>
      );
    }
    console.log("Riga 156 mostraPulsante: ", mostraPulsante);
    if (mostraPulsante) {
      console.log("Riga 158 oid: ", oid);

      return (
        <div>
          <CssBaseline />
          <div style={{ height: "10px" }}></div>
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
          <div style={{ height: "10px" }}></div>
          {oldData ? (
            <MyContainer direzione="row">
              <Button
                color="primary"
                variant="contained"
                fullWidth={true}
                onClick={() => {
                  cambiaModifica(!modifica);
                  inizializzaRoba(oid);
                }}
              >
                Modifica
              </Button>
            </MyContainer>
          ) : (
            <></>
          )}

          <div style={{ height: "15px" }}></div>

          {oldData ? (
            <MyContainer direzione="row" style={{ paddingBottom: "-5px" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={async () => {
                  nascondiDocumento(id);
                  document.getElementById(id).innerHTML = "";
                }}
              >
                <MyContainer direzione="column">
                  <Typography variant="caption">Hide</Typography>
                  <VisibilityOffIcon />
                </MyContainer>
              </Button>
              <div style={{ width: "20px" }}></div>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: "30px", height: "30px" }}
                onClick={async () => {
                  let esito = window.confirm(
                    "Occhio che non torni più indietro"
                  );

                  if (esito) {
                    eliminaDocumento(id);
                    document.getElementById(id).innerHTML = "";
                  } else {
                  }
                }}
              >
                <DeleteIcon />
              </Button>

              {oldData && !oldData.visibile ? (
                <>
                  <div style={{ width: "20px" }}></div>
                  <Button
                    style={{ width: "50px", height: "60px" }}
                    variant="contained"
                    onClick={() => {
                      rendiVisibile(id);
                    }}
                  >
                    <MyContainer direzione="row">
                      <Typography variant="caption">Show</Typography>
                      <VisibilityIcon />
                    </MyContainer>
                  </Button>
                </>
              ) : (
                ""
              )}
            </MyContainer>
          ) : (
            <></>
          )}

          <div style={{ height: "10px" }}></div>

          <MyContainer direzione="column">
            <form id="form">
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
                          disabled={!modifica}
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
                                <input id="logoDrop" {...getInputProps()} />
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
                        disabled={!modifica}
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
                              <input id="immagineDrop" {...getInputProps()} />
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
                titolo={
                  <MyContainer direzione="row">
                    <TextField
                      id="titolo"
                      disabled={!modifica}
                      label={(() => {
                        try {
                          return typeof oldData.titolo !== "undefined"
                            ? oldData.titolo
                            : "Titolo";
                        } catch (error) {}

                        try {
                          return oldData.titolo ? (
                            <>
                              <div style={{ width: "10px" }}></div>
                              <div
                                style={{
                                  color: "red",
                                  paddingRight: "10px",
                                }}
                              >
                                {oldData.titolo}
                              </div>
                            </>
                          ) : (
                            ""
                          );
                        } catch (error) {
                          return "Titolo";
                        }
                      })()}
                    />
                  </MyContainer>
                }
                body={
                  <>
                    <CssBaseline />

                    <TextField
                      disabled={!modifica}
                      style={{
                        marginTop: "25px",
                        height: "100px",
                        width: "100%",
                      }}
                      id="textAreaSottotitolo"
                      label={(() => {
                        try {
                          return typeof oldData.sottotilo !== "undefined"
                            ? oldData.sottotilo
                            : "Titolo";
                        } catch (error) {}

                        try {
                          return oldData.sottotilo ? (
                            <>
                              <div style={{ width: "10px" }}></div>
                              <div
                                style={{
                                  color: "red",
                                  paddingRight: "10px",
                                }}
                              >
                                {oldData.sottotilo}
                              </div>
                            </>
                          ) : (
                            ""
                          );
                        } catch (error) {
                          return "Titolo";
                        }
                      })()}
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
                    disabled={!modifica}
                    style={{
                      marginTop: "25px",
                      height: "100px",
                      width: "100%",
                    }}
                    id="textAreaContenuti"
                    label={(() => {
                      try {
                        return typeof oldData.contenuti !== "undefined"
                          ? oldData.contenuti
                          : "Titolo";
                      } catch (error) {}

                      try {
                        return oldData.contenuti ? (
                          <>
                            <div style={{ width: "10px" }}></div>
                            <div
                              style={{
                                color: "red",
                                paddingRight: "10px",
                              }}
                            >
                              {oldData.contenuti}
                            </div>
                          </>
                        ) : (
                          ""
                        );
                      } catch (error) {
                        return "Titolo";
                      }
                    })()}
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                ) : (
                  <></>
                )}
              </MyCard>
            </form>
            <div style={{ height: "15px" }}></div>
            <MyContainer direzione="row">
              <Button
                fullWidth={true}
                variant="contained"
                color="primary"
                onClick={async () => {
                  rendiVisibile(id);
                }}
              >
                <CheckIcon />
              </Button>
              <div style={{ width: "25px" }}></div>
            </MyContainer>
            <div style={{ height: "30px" }}></div>
          </MyContainer>
        </div>
      );
    }
  }
}
