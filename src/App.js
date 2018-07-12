import React, { Component } from 'react';
import Board from './Board';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.gameModel = {
      winner: 'none',
      currentPlayer: 'Player 1',
      boardModel: [0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0]
    };
    this.state = {
      gameModel: this.gameModel,
    }
  }

  playerTurn = (columnNum) => () => {
    const currentPlayer = this.gameModel.currentPlayer;
    this.gameModel.currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    console.log(columnNum)
    this.setState({
      gameModel: this.gameModel
    })
  }

  render() {
    return (
      <div className="App">
        <Board playerTurn={this.playerTurn} />
      </div>
    );
  }
}

export default App;
