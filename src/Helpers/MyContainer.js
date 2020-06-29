import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

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
