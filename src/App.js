import React, { Component } from 'react';
import Board from './Board';
import './App.css';

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <img src={board} className="App-board" />
      // </div>
      <div className="App">
        <Board />
      </div>
    );
  }
}

export default App;
