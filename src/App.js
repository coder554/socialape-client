import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";

//Component
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

//CSS
import "./App.css";
import GLOBAL_THEME from "./util/theme";

const theme = createMuiTheme(GLOBAL_THEME);

const token = localStorage.FBIdToken;
let authenticated;
if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <AuthRoute path="/login" exact component={Login} />
              <AuthRoute path="/signup" exact component={Signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
