import React from "react";
import LeftMenu from "../Helpers/Menus";
import MyContainer from "../Helpers/MyContainer.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

export default function Homepage() {
  return (
    <div>
      <CssBaseline />
      <LeftMenu />
      <div style={{ height: "25px" }}></div>
      <MyContainer>
        <Typography color="Primary" gutterBottom></Typography>
      </MyContainer>
    </div>
  );
}
