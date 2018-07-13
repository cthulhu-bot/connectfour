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

  placePiece = (column, boardModel, player) => {
    let newBoardModel = boardModel;
    const columnSlots = boardModel.filter((slot, idx) => idx % (column - 1) === 0);
    const columnFilled = columnSlots.every((slot, idx) => slot !== 0);
    if (!columnFilled) {
      const firstEmptySlot = columnSlots.reduce((acc, slot, idx) => {
        return slot === 0 ? idx : acc;
      }, 0);
      newBoardModel[(column - 1) + (7 * firstEmptySlot)] = player === 'Player 1' ? 1 : 2;
    } else {
      throw 'that column is already filled';
    }
    return newBoardModel;
  }

  playerTurn = (columnNum) => () => {
    const currentPlayer = this.gameModel.currentPlayer;
    this.gameModel.currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';

    try {
      this.gameModel.boardModel = this.placePiece(columnNum, this.gameModel.boardModel, this.gameModel.currentPlayer);
    } catch (e) {
      
    }

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
