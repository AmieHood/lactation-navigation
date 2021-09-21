import React, { Component } from "react";
//home
import Home from "./components/Home";
//styles
import { GlobalStyle } from "./App.styles";
//Portal
import Portal from "./components/Auth/Portal";
//User
import User from "./components/Users/User";
//Chapter
import Chapter from "./components/Chapter/Chapter";
//Counselor
import Counselor from "./components/Users/Counselor";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import Sitebar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

type AppState = {
  token: string;
};

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      token: ""
    };
  }

  componentDidMount() {
    this.setState({ token: localStorage.getItem("token") || "" })
    console.info(this.state.token); 
    }


  updateToken = (newToken: string): void => {
    localStorage.setItem("token", newToken);
    this.setState({ token: newToken });
    console.info(this.state.token);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ token: "" });
  };

  urlPatterns = () => {
    return (
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/portal">
        <Portal updateToken={this.updateToken} />
      </Route>
      <Route exact path="/chapter">
        <Chapter
          token={this.state.token}
          updateToken={this.updateToken}
        />
      </Route>
      <Route exact path="/counselor">
        <Counselor token={this.state.token}/>
      </Route>
      <Route exact path="/user">
        <User updateToken={this.updateToken} />
      </Route>
    </Switch>
    )
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <Router>
          <Sitebar token={this.state.token} clickLogout={this.clearToken} />
          { this.urlPatterns() }
        </Router>
      </>
    );
  }
}

export default App;
