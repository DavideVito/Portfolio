import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  StorageImage,
  useStorage,
  useStorageDownloadURL,
  useStorageTask,
} from "reactfire";

function ProjectCards(props) {
  let storage = useStorage().ref(props.imgPath);
  let image = useStorageDownloadURL(storage);

  if (image.status === "loading") return "loading";

  image = image.data;

  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={image} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        {props.link && (
          <Button variant="primary" href={props.link} target="_blank">
            <i className="cil-external-link">&nbsp;</i>
            {props.isBlog ? "View Blog" : "View Project"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
