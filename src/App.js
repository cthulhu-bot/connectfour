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
        0, 0, 0, 0, 0, 0, 0],
        error: null,
    };
    this.state = {
      gameModel: this.gameModel,
    }
  }

  placePiece(column, boardModel, player) {
    let newBoardModel = boardModel;
    const columnSlots = boardModel.filter((slot, idx) => idx % 7 === column - 1);
    console.log(columnSlots);
    const columnFilled = columnSlots.every((slot, idx) => slot !== 0);
    console.log(columnFilled);

    if (!columnFilled) {
      const firstEmptySlot = columnSlots.reduce((acc, slot, idx) => {
        return slot === 0 ? idx : acc;
      }, 0);
      newBoardModel[(column - 1) + (7 * firstEmptySlot)] = player === 'Player 1' ? 1 : 2;
    } else {
      throw { message: `Column ${column} filled` };
    }
    
    return newBoardModel;
  }

  playerTurn = (columnNum) => () => {
    const currentPlayer = this.state.gameModel.currentPlayer;

    try {
      this.gameModel.boardModel = this.placePiece(columnNum, this.state.gameModel.boardModel, currentPlayer);
    } catch (e) {
      this.setState((prevState, props) => {
        prevState.error = e.message;
        return prevState;
      });
    }
    this.gameModel.currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    this.gameModel.error = null;

    this.setState((prevState, props) => {
      return { gameModel: this.gameModel };
    });
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
