import React from 'react';
//home
import Home from './components/Home';
//styles
import { GlobalStyle } from './App.styles';

function App() {
  return (
    <>
    <GlobalStyle />
    <div className="App">
      <Home />
    </div>
    </>
  );
}

export default App;
