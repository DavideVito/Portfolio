import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import BlogCard from "./BlogsCards";
import Particle from "../Particle";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.jpeg";
import editor from "../../Assets/Projects/codeEditor.png";
import eeg from "../../Assets/Projects/eeg.gif";
import suicide from "../../Assets/Projects/suicide.png";
import algo from "../../Assets/Projects/algo.png";
import plant from "../../Assets/Projects/plant.jpeg";

import {useFirestoreCollectionData, useFirestore} from "reactfire"

function Projects() {

  const firestore = useFirestore().collection("Cards").where("tipo", "==", "projects");

  let data = useFirestoreCollectionData(firestore)


  if(data.status === "loading")
  {
    return ""
  }
  
  data = data.data


  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {

            data.map(progetto => {

              console.log(progetto)
              return <Col md={4} className="project-card">
            


              <ProjectCard
                imgPath={progetto.fotoGrossa}
                isBlog={false}
                title={progetto.titolo}
                description={progetto.en.sottotilo}
                link={progetto.link}
              />
            </Col>



            })


          }
          
        </Row>
        
      </Container>
    </Container>
  );
}

export default Projects;
