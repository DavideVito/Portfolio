import React from "react";
import Homepage from "./Main/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Studio from "./Main/Studio";
import CosaHoFatto from "./Main/CosaHoFatto";
import Competenze from "./Main/Competenze";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  theme.typography.h3 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/me" exact component={Homepage} />{" "}
          <Route path="/" exact component={Homepage} />{" "}
          <Route path="/Study" exact component={Studio} />{" "}
          <Route path="/competenze" exact component={Competenze} />{" "}
          <Route path="/projects" exact component={CosaHoFatto} />{" "}
        </Switch>{" "}
      </Router>
    </ThemeProvider>
  );
}

export default App;
