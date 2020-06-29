import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function MyContainer(props) {
  return (
    <Container maxWidth="xs">
      <Grid
        container
        direction={props.direzione}
        justify="center"
        alignItems="center"
      >
        {props.children}
      </Grid>
    </Container>
  );
}
