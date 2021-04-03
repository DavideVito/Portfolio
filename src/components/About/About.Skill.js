import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Github from "./Github";

import PageTransition from "react-router-page-transition";
function AboutSkill(props) {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          Spacca fra
        </Row>
        <Github />
      </Container>
    </Container>
  );
}

export default AboutSkill;
