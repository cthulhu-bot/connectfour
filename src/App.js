import React, { Component } from 'react';
import logo from './logo.svg';
import circle from './circle.svg';
import board from './board.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={board} className="App-board" />
      </div>
    );
  }
}

export default App;
