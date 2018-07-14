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

  placePiece(column, gameModel) {
    let newGameModel = gameModel, newPiecePos = null;
    const columnSlots = newGameModel.boardModel.filter((slot, idx) => idx % 7 === column - 1);
    const columnFilled = columnSlots.every((slot, idx) => slot !== 0);

    if (!columnFilled) {
      const firstEmptySlot = columnSlots.reduce((acc, slot, idx) => {
        return slot === 0 ? idx : acc;
      }, 0);
      newPiecePos = (column - 1) + (7 * firstEmptySlot);
      newGameModel.boardModel[newPiecePos] = gameModel.currentPlayer === 'Player 1' ? 1 : 2;
    } else {
      throw { message: `Column ${column} filled` };
    }
    newGameModel.winner = this.evalWinner(gameModel.boardModel, newPiecePos, gameModel.currentPlayer);
    
    return newGameModel;
  }

  playerTurn = (columnNum) => () => {
    const currentPlayer = this.state.gameModel.currentPlayer;

    try {
      this.gameModel = this.placePiece(columnNum, this.state.gameModel);
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

  evalWinner = (boardModel, lastPosition, currentPlayer) => {
    console.log('boardModel: ', boardModel);
    console.log('pos: ', lastPosition);
    return null;
  }

  render() {
    return (
      <div className="App">
        <Board playerTurn={this.playerTurn}
               boardModel={this.state.gameModel.boardModel} />
      </div>
    );
  }
}

export default App;
