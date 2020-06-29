import React from "react";
import LeftMenu from "../Helpers/Menus";
import MyContainer from "../Helpers/MyContainer.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

export default function Homepage() {
  return (
    <div>
      <CssBaseline />
      <LeftMenu />
      <div style={{ height: "25px" }}></div>
      <MyContainer direzione="column">
        <Typography color="inherit" variant="h1" gutterBottom>
          Davide Vitiello
        </Typography>
        <Typography color="inherit" gutterBottom variant="h4">
          <Avatar
            style={{
              margin: "10px",
              width: "100px",
              height: "100px",
            }}
            alt="Davide Vitiello"
            src="https://www.grazia.it/content/uploads/2019/10/Pixel-foto-notturne-500x375.jpg"
          />{" "}
        </Typography>
        <Typography color="inherit" gutterBottom variant="h4">
          operghpore
        </Typography>
      </MyContainer>
    </div>
  );
}
