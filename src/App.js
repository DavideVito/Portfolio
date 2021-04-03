import "./App.css";
import React, { useState, useEffect, Suspense } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/Resume";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollToTop from "./components/ScrollToTop";
import { FirebaseAppProvider } from "reactfire";
import "firebase/firestore"
import "firebase/storage"

const config = {
  apiKey: "AIzaSyBYD561ewO8v2jDqWVubPhHjwT1njlwHWY",
  authDomain: "myportfolio-ca2bd.firebaseapp.com",
  databaseURL: "https://myportfolio-ca2bd.firebaseio.com",
  projectId: "myportfolio-ca2bd",
  storageBucket: "myportfolio-ca2bd.appspot.com",
  messagingSenderId: "557491071481",
  appId: "1:557491071481:web:6fcb1063c362cebd8cb528",
  measurementId: "G-0GYFG192M0",
};

function App() {
  const [load, upadateLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      upadateLoad(false);
    }, 1200);
  }, []);
  return (
    <FirebaseAppProvider firebaseConfig={config}>
      <Router>
        <Preloader load={load} />
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          <Navbar />
          <ScrollToTop />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/project">
              <Suspense fallback="loading">
                <Projects />
              </Suspense>
            </Route>
            <Route path="/about" component={About} />
            <Route path="/resume" component={Resume} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </FirebaseAppProvider>
  );
}

export default App;
