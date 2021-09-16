import React, { Component } from 'react';
//home
import Home from './components/Home';
//styles
import { GlobalStyle } from './App.styles';
//Signup
import Signup from './components/Auth/Signup';
//Portal
import Portal from './components/Auth/Portal';

type AppState = {
  token: string
}

class App extends Component <{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      token: ''
    }
  }

  componentDidMount() {
    if(localStorage.getItem('token')){
      this.setState({
        token: localStorage.getItem('token')! // Exclamation point is a non-null assertion expression operator
      })
      console.info(this.state.token)
    }
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem('token', newToken)
    this.setState({token: newToken})
    console.info(this.state.token);
    
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({token: ''})
  }

  render(){
    return (
      <>
      <GlobalStyle />
      <div className="App">
        {/* <Home /> */}
        {/* <Signup updateToken={this.updateToken}/> */}
        <Portal updateToken={this.updateToken} />
      </div>
      </>
    );

  }
}

export default App;
