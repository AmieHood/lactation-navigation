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

type AppState = {
  token: string;
  isCounselor: boolean
};

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      token: localStorage.getItem("token") || "",
      isCounselor: false
    };
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
      <Route exact path="/findchapter">
        <FindChapter />
      </Route>
      <Route exact path="/donate">
        <Donate />
      </Route>
      <Route exact path="/chapter">
        <ChapterIndex
          token={this.state.token} isCounselor={this.state.isCounselor}
        />
      </Route>
      <Route exact path="/counselor">
        <CounselorIndex token={this.state.token} isCounselor={this.state.isCounselor} />
      </Route>
      <Route exact path="/user">
        <UserIndex token={this.state.token} isCounselor={this.state.isCounselor} />
      </Route>
    </Switch>
    )
  }

  fetchCounselor = async (): Promise<void> => {
    console.info('working?')
    console.info(`${APIURL}/counselor`)
    try {
        let res = await fetch(`${APIURL}/counselor/validate`, {
            headers: new Headers ({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.state.token}`
            })
        })
            let Counselor = await res.json()
            // let Counselor = json
            console.info(Counselor)
            // console.info(json)
        if (Counselor.id){
            this.setState({isCounselor: true})
            return
        } 
    } catch (error) {
    console.error(error)
    this.setState({ isCounselor: false})
    }
}

  componentDidUpdate = (prevProps: {}, prevState: AppState) => {
    if (this.state.token != prevState.token) {
      this.fetchCounselor()
    }
  }
  
  render() {
    console.log({isCounselor: this.state.isCounselor})
    return (
      <>
        <GlobalStyle />
        <Router>
          <Sitebar token={this.state.token} clickLogout={this.clearToken} isCounselor={this.state.isCounselor}/>
          { this.urlPatterns() }
        </Router>
      </>
    );
  }
}

export default App;
