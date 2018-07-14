import React, { Component } from 'react';
import Board from './Board';
import Display from './Display';
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

  /* The IsThereAWinner? algorithm:
     Reduction of the 7x7 matrix surrounding the last placed piece
     Reduce the 7x7 to the 4 axes surrounding the new piece:
      1. Vertical
      2. Horizontal
      3. Diagonal (forward slash)
      4. Diagonal (back slash)
     Build up these 4 different axes and reduce to see if any of them
     have 4 of the same contiguous color */
  evalWinner = (boardModel, lastPosition, currentPlayer) => {
    let vertical = [], horizontal = [], fslash = [], bslash = [];
    const playerColor = currentPlayer === 'Player 1' ? 1 : 2;

    vertical = this.getVerticalPiecesAroundCenter(boardModel, lastPosition);
    horizontal = this.getHorizontalPiecesAroundCenter(boardModel, lastPosition);
    fslash = this.getFSlashPiecesAroundCenter(boardModel, lastPosition);
    bslash = this.getBSlashPiecesAroundCenter(boardModel, lastPosition);
    let axes = [vertical, horizontal, fslash, bslash];

    const canHazWinner = axes.some(axis => {
      const maxRowLength = axis.reduce((acc, piece) => {
        return piece === playerColor ? ++acc : 0;
      }, 0);
      return maxRowLength >= 4;
    });

    return canHazWinner ? currentPlayer : null;
  }

  getVerticalPiecesAroundCenter = (boardModel, center) => {
    let vertical = [];
    for (let i = -3; i <= 3; i++) {
      if (boardModel[center + (i*7)]) {
        vertical.push(boardModel[center + (i*7)]);
      }
    }
    return vertical;
  }

  getHorizontalPiecesAroundCenter = (boardModel, center) => {
    let horizontal = [];
    for (let i = -3; i<= 3; i++) {
      if (boardModel[center + i]) {
        horizontal.push(boardModel[center + i]);
      }
    }
    return horizontal;
  }

  getFSlashPiecesAroundCenter = (boardModel, center) => {
    let fslash = [];
    for (let i = -3; i <= 3; i++) {
      if (boardModel[center + ((i*7) - i)]) {
        fslash.push(boardModel[center + ((i*7) - i)]);
      }
    }
    return fslash;
  }

  getBSlashPiecesAroundCenter = (boardModel, center) => {
    let bslash = [];
    for (let i = -3; i <= 3; i++) {
      if (boardModel[center + ((i*7) + i)]) {
        bslash.push(boardModel[center + ((i*7) + i)]);
      }
    }
    return bslash;
  }

  render() {
    return (
      <div className="App">
        <Board playerTurn={this.playerTurn}
               boardModel={this.state.gameModel.boardModel} />
        <Display className="App-display" gameModel={this.state.gameModel} />
      </div>
    );
  }
}

export default App;
