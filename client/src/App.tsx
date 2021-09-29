import React, { Component } from "react";
//home
import Home from "./components/Home";
//styles
import { GlobalStyle } from "./App.styles";
//Portal
import Portal from "./components/Auth/Portal";
//User
import UserIndex from "./components/Users/UserIndex";
//Chapter
import ChapterIndex from "./components/Chapter/ChapterIndex";
//Counselor
import CounselorIndex from "./components/Counselor/CounselorIndex";
import Sitebar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import FindChapter from "./components/Unprotected/FindChapter";
import Donate from './components/Unprotected/Donate'
import APIURL from './utils/Environment'
import { User, Counselor } from './types'

type AppState = {
  token: string;
  isCounselor: boolean
  user: User
};


class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      token: localStorage.getItem("token") || "",
      isCounselor: false,
      user: {
        firstName: '',
        lastName: '', 
        email: '', 
        password: '',
        confirmPassword: '',
        emailValid: false, 
        message: '',
        Counselor: {
          dateAccredited: '',
          role: '',
          token: '',
          id: 0,
        },
        id: 0,
      }
    };
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem("token", newToken);
    this.setState({ token: newToken });
    console.info(this.state.token);
    // this.fetchCounselor()
  };

  setUser = (u: User): void => {
    this.setState({ user: u})
  }

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
        <Portal updateToken={this.updateToken} setUser={this.setUser}/>
      </Route>
      <Route exact path="/findchapter">
        <FindChapter />
      </Route>
      <Route exact path="/donate">
        <Donate />
      </Route>
      <Route exact path="/chapter">
        <ChapterIndex
          token={this.state.token} user={this.state.user}
        />
      </Route>
      <Route exact path="/counselor">
        <CounselorIndex token={this.state.token} user={this.state.user} />
      </Route>
      <Route exact path="/user">
        <UserIndex token={this.state.token} user={this.state.user}  />
      </Route>
    </Switch>
    )
  }
  
  render() {
    return (
      <>
        <GlobalStyle />
        <Router>
          <Sitebar token={this.state.token} clickLogout={this.clearToken} user={this.state.user}/>
          { this.urlPatterns() }
        </Router>
      </>
    );
  }
}

export default App;
