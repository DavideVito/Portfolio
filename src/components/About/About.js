import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import "./stileAnimazione.css";
import Card from "react-bootstrap/Card";

import { CSSTransition } from "react-transition-group";

import {
  useFirestore,
  useFirestoreCollectionData,
  useStorage,
  useStorageDownloadURL,
} from "reactfire";

function About(props) {
  const [showButton, setShowButton] = useState(true);

  const chiudiPopup = () => setShowFinestra(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, chiudiPopup);
  const [showFinestra, setShowFinestra] = useState(false);
  const [currentlySelected, setCurrentlySelected] = useState("null");

  const handleClick = (e) => {
    setShowFinestra(true);
    let sel = e.target.className.split("-")[1];
    setCurrentlySelected(sel);
  };

  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know Who <strong className="purple">I AM</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
        <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          {showButton && (
            <>
              <Techstack
                iconName="devicon-javascript-plain"
                style={{ cursor: "pointer" }}
                onClick={handleClick}
              />

              <Techstack
                iconName="devicon-nodejs-plain-wordmark "
                onClick={handleClick}
              />
              <Techstack
                iconName="devicon-express-original-wordmark"
                onClick={handleClick}
              />
              <Techstack
                iconName="devicon-react-original-wordmark"
                onClick={handleClick}
              />
              <Techstack
                iconName="devicon-git-plain-wordmark"
                onClick={handleClick}
              />
              <Techstack
                iconName="devicon-bootstrap-plain-wordmark"
                onClick={handleClick}
              />
              <Techstack iconName="devicon-swift-plain" onClick={handleClick} />
              <Techstack
                iconName="devicon-typescript-plain"
                onClick={handleClick}
              />
              <Techstack
                iconName="devicon-npm-original-wordmark"
                onClick={handleClick}
              />
              <Techstack iconName="devicon-php-plain" onClick={handleClick} />
              <Techstack iconName="devicon-mysql-plain" onClick={handleClick} />
              <Techstack
                iconName="devicon-electron-original"
                onClick={handleClick}
              />
              <Techstack
                iconName="devicon-firebase-plain"
                onClick={handleClick}
              />
              <Techstack iconName="devicon-html5-plain" onClick={handleClick} />
              <Techstack
                iconName="devicon-jquery-plain"
                onClick={handleClick}
              />
            </>
          )}

          <CSSTransition
            in={showFinestra}
            timeout={300}
            classNames="alert"
            unmountOnExit
            onEnter={() => setShowButton(false)}
            onExited={() => setShowButton(true)}
          >
            <div
              ref={wrapperRef}
              style={{
                width: "100vw",
                height: "100vh",
                zIndex: "9999",
              }}
            >
              <strong
                className="purple"
                onClick={chiudiPopup}
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontStyle: " italic",
                  fontSize: "2rem",
                }}
              >
                Close
              </strong>
              <ShowInfo selezionato={currentlySelected} chiudi={chiudiPopup} />
            </div>
          </CSSTransition>
        </Row>
        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          <Techstack iconName="devicon-linux-plain" />
          <Techstack iconName="cib-visual-studio-code" />
          <Techstack iconName="devicon-googlecloud-plain" />
          <Techstack iconName="cib-postman" />
          <Techstack iconName="devicon-bash-plain" />
          <Techstack iconName="devicon-debian-plain" />
          <Techstack iconName="devicon-docker-plain" />
          <Techstack iconName="devicon-nginx-plain" />

          <Techstack iconName="cib-heroku" />
        </Row>
        <Github />
      </Container>
    </Container>
  );
}

export default About;

function useOutsideAlerter(ref, func) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      console.log(event.target);
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function ShowInfo(props) {
  const ref = useFirestore()
    .collection("Cards")
    .where("tipo", "==", "competenze")
    .where("shortname", "==", props.selezionato || "nothing");

  const data = useFirestoreCollectionData(ref);

  if (data.status === "loading") {
    return "";
  }

  let comp = data.data[0];

  if (!comp) {
    return (
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              No data avaiable for this one ☹️
            </h1>
            <Card className="quote-card-view">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  Check the other
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row style={{ justifyContent: "center", padding: "10px" }}>
        <Col
          md={7}
          style={{
            justifyContent: "center",
            paddingTop: "30px",
            paddingBottom: "50px",
          }}
        >
          <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
            {comp.titolo}
          </h1>
          <Card className="quote-card-view">
            <Card.Body>
              <blockquote className="blockquote mb-0">
                {comp.en.sottotilo}
              </blockquote>
              <br />
              <blockquote
                className="blockquote mb-0"
                style={{ marginTop: "5px" }}
              >
                {comp.en.contenuti}
              </blockquote>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
