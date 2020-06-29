import React from "react";
import LeftMenu from "../Helpers/Menus";
import MyContainer from "../Helpers/MyContainer.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Timeline from "../Helpers/Timeline";

export default function Studio() {
  return (
    <div>
      <CssBaseline />
      <LeftMenu />
      <div style={{ height: "25px" }}></div>
      <MyContainer>
        <Typography color="inherit" variant="h1" gutterBottom>
          Dove ho studiato?
        </Typography>
        <Typography color="inherit" gutterBottom variant="h4">
          <Timeline />
        </Typography>
        <Typography color="inherit" gutterBottom variant="h4"></Typography>
      </MyContainer>
    </div>
  );
}
